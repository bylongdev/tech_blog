import { prisma } from "@techblog/database/src/client.js";
import { EmbeddingService } from "../../services/embedding.service.js";
import { QueueProducer } from "../../queues/producer.queue.js";

/* 
	EmbeddingAgent take responsibility for:
	- Extracting embeddingText from ArticleCandidate
	- Calling EmbeddingService to create embedding vector
	- Updating ArticleCandidate with embedding vector and status
*/

export class EmbeddingAgent {
	private embeddingService = new EmbeddingService();

	// Process one candidate by ID
	async process(candidateId: string) {
		// Step 1: Fetch candidate from DB
		const candidate = await prisma.articleCandidate.findUnique({
			where: { id: candidateId },
		});

		if (!candidate) {
			throw new Error(
				`ArticleCandidate not found for candidateId: ${candidateId}`,
			);
		}

		// Step 2: Create embedding vector
		const vector = await this.embeddingService.createEmbedding(
			candidate.embeddingText,
		);

		// Step 3: Update candidate with embedding vector and status
		await prisma.articleCandidate.update({
			where: { id: candidate.id },
			data: {
				embedding: vector,
				status: "EMBEDDED",
			},
		});

		// Step 4: Add job to find best match in grouping service
		const queueProducer = new QueueProducer("embedding");
		await queueProducer.add("find_best_match", {
			candidateId: candidate.id,
			vector,
		});
		await queueProducer.close();

		return {
			candidateId: candidate.id,
			vector,
			vectorLength: vector.length,
			status: "EMBEDDED",
		};
	}
}
