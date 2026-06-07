import { EmbeddingAgent } from "../agents/embedding/embedding.agent.js";
import { GroupingService } from "../services/article-grouping.service.js";

export async function embeddingJob(rawArticleId: string) {
	// This is a placeholder for the actual embedding job logic
	// You can implement the logic to fetch candidates, create embeddings, and update the database here
	console.log("Running embedding job...");

	const agent = new EmbeddingAgent();

	const res = await agent.process(rawArticleId);

	const groupingService = new GroupingService();
	await groupingService.findBestMatch(res.candidateId, res.vector); // Example of how to call grouping service after embedding
}
