import { EmbeddingAgent } from "../agents/embedding/embedding.agent.js";
import { GroupingService } from "../services/article-grouping.service.js";

export async function embeddingJob(candidateId: string) {
	// This is a placeholder for the actual embedding job logic
	// You can implement the logic to fetch candidates, create embeddings, and update the database here
	console.log("Running embedding job...");

	try {
		const agent = new EmbeddingAgent();

		const res = await agent.process(candidateId);

		const groupingService = new GroupingService();
		await groupingService.findBestMatch(res.candidateId, res.vector); // Example of how to call grouping service after embedding
	} catch (error) {
		console.error("Error in embedding job:", error);
	}
}
