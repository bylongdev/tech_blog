import { prisma } from "@techblog/database/src/client.js";
import { QueueProducer } from "../queues/producer.queue.js";

// A candidate is only "stuck" if it hasn't been touched recently - this avoids
// racing with a push that is still in flight for the current fetch cycle.
const GRACE_PERIOD_MS = 2 * 60 * 1000; // 2 minutes

/*
 * Reconciles ArticleCandidate rows against BullMQ: a candidate with status
 * QUEUED must have a real job in the "extracting" queue, and a FAILED
 * candidate that never made it into the queue should be retried. Both cases
 * are repaired the same way - re-add the job with the same deterministic
 * jobId (extract-<candidateId>) only if it's missing, so we never create a
 * duplicate job for a candidate that is already waiting/active/delayed.
 *
 * This only covers the extracting stage (raw article -> metadata extraction),
 * which is where candidates are created via RawArticleService.bulkSave.
 */
async function requeueStuckCandidates() {
	const candidates = await prisma.articleCandidate.findMany({
		where: {
			status: { in: ["QUEUED", "FAILED"] },
			updatedAt: { lte: new Date(Date.now() - GRACE_PERIOD_MS) },
		},
		select: {
			id: true,
			rawArticle: { select: { content: true } },
		},
	});

	if (!candidates.length) {
		return;
	}

	const queueProducer = new QueueProducer("extracting");

	try {
		for (const candidate of candidates) {
			const jobId = `extract-${candidate.id}`;

			try {
				const existingJob = await queueProducer.getJob(jobId);

				if (existingJob) {
					// A job is already waiting/active/delayed for this candidate - the
					// previous QUEUED push succeeded, nothing to repair here.
					continue;
				}

				await queueProducer.add(
					"meta_extracting",
					{
						rawArticleId: candidate.id,
						content: candidate.rawArticle?.content || "",
					},
					jobId,
				);

				await prisma.articleCandidate.update({
					where: { id: candidate.id },
					data: { status: "QUEUED" },
				});

				console.log(`Re-queued stuck candidate ${candidate.id} (jobId: ${jobId})`);
			} catch (error) {
				console.error(
					`Failed to re-queue stuck candidate ${candidate.id} (jobId: ${jobId}):`,
					error,
				);
			}
		}
	} finally {
		await queueProducer.close();
	}
}

export { requeueStuckCandidates };
