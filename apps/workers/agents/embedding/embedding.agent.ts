import { prisma } from "@techblog/database/src/client.js";
import { EmbeddingService } from "./embedding.service.js";

/* 
	EmbeddingAgent take responsibility for:
	- Extracting embeddingText from ArticleCandidate
	- Calling EmbeddingService to create embedding vector
	- Updating ArticleCandidate with embedding vector and status
*/

export class EmbeddingAgent {
	private embeddingService = new EmbeddingService();

	// Process one candidate by ID
	async process(rawArticleId: string) {
		// Step 1: Fetch candidate from DB
		const candidate = await prisma.articleCandidate.findUnique({
			where: { rawArticleId },
		});

		if (!candidate) {
			/* await prisma.articleCandidate.create({
				data: {
					rawArticleId,
					status: "QUEUED",
				},
			});
			return; */
			throw new Error(
				`ArticleCandidate not found for rawArticleId: ${rawArticleId}`,
			);
		}

		if (!candidate.embeddingText) {
			throw new Error(`Missing embeddingText for candidate: ${rawArticleId}`);
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

		return {
			candidateId: candidate.id,
			vectorLength: vector.length,
			status: "EMBEDDED",
		};
	}
}
