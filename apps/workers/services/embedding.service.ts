import { openAIClient } from "../agents/lib/openai/openai.client.js";

export class EmbeddingService {
	// Create embedding vector from text using OpenAI API
	async createEmbedding(text: string): Promise<number[]> {
		const model =
			process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
		const response = await openAIClient.createEmbedding(text, model);

		// Validate response and extract embedding vector
		if (!response || response.length === 0) {
			throw new Error("No embedding data returned from OpenAI API.");
		}

		return response[0]?.embedding || [];
	}
}
