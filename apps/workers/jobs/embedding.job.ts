import { EmbeddingAgent } from "../agents/embedding/embedding.agent.js";

export async function embeddingJob(candidateId: string) {
	// This is a placeholder for the actual embedding job logic
	// You can implement the logic to fetch candidates, create embeddings, and update the database here
	console.log("Running embedding job...");

	try {
		const agent = new EmbeddingAgent();
		await agent.process(candidateId); // This will create the embedding and update the candidate status to "EMBEDDED"
	} catch (error) {
		console.error("Error in embedding job:", error);
	}
}
