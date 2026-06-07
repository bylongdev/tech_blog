import { EmbeddingAgent } from "../agents/embedding/embedding.agent.js";

export async function embeddingJob(rawArticleId: string) {
	// This is a placeholder for the actual embedding job logic
	// You can implement the logic to fetch candidates, create embeddings, and update the database here
	console.log("Running embedding job...");

	const agent = new EmbeddingAgent();

	const res = await agent.process(rawArticleId);
	console.log("Embedding job result:", res);
}
