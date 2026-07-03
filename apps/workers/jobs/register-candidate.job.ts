import { prisma } from "@techblog/database/src/client.js";
import { ContentService } from "../utils/helpers/clean-text.helper.js";
import { QueueProducer } from "../queues/producer.queue.js";

// Separate function to handle the register_candidate job
async function registerCandidateJob(job: any) {
	try {
		const rawArticleId = job.data.rawArticleId;

		// Clean the title and content using the ContentService
		const contentService = new ContentService();
		const cleanedTitle = contentService.clean(job.data.title);
		const cleanedContent = contentService.clean(job.data.content || "");

		// Combine cleaned title and content for embedding
		const embeddingText = [`${cleanedTitle}`, `${cleanedContent.slice(0, 800)}`]
			.filter(Boolean)
			.join("\n");

		// Create a new ArticleCandidate for embedding and grouping
		const candidate = await prisma.articleCandidate.create({
			data: {
				rawArticleId: rawArticleId,
				cleanedTitle: cleanedTitle, // You can replace this with the cleaned title if you have a TitleService
				embeddingText: embeddingText, // You can replace this with the cleaned title if you have a TitleService
				status: "QUEUED",
			},
		});

		// Add the article to the embedding queue
		const queueProducer = new QueueProducer("embedding");
		await queueProducer.add("create_embedding", {
			articleCandidateId: candidate.id,
		});
		await queueProducer.close(); // Close the producer after adding the job

		console.log(`Article with raw ID ${rawArticleId} is queued for embedding.`);
	} catch (error) {
		console.error("Error processing register_candidate job:", error);
	}
}

export { registerCandidateJob };
