import { OpenAIClient } from "../../agents/lib/openai/openai.client.js";

export class EmbeddingService {
	private agent = new OpenAIClient("text-embedding-3-small");

	// Create embedding vector from text using OpenAI API
	async createEmbedding(input: string | string[]): Promise<number[]> {
		if (!input || (Array.isArray(input) && input.length === 0)) {
			throw new Error("Input for embedding cannot be empty.");
		}

		const model =
			process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";

		const response = await this.agent.embeddings.create({ input, model });

		// Validate response from the API
		if (!response || !response.data || response.data.length === 0) {
			throw new Error("No embedding data returned from OpenAI API.");
		}

		return response.data[0]?.embedding || [];
	}
}
