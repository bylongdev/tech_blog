import { prisma } from "@techblog/database/src/client.js";
import { EmbeddingService } from "../../services/embedding.service.js";

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

		return {
			candidateId: candidate.id,
			vector,
			vectorLength: vector.length,
			status: "EMBEDDED",
		};
	}
}
