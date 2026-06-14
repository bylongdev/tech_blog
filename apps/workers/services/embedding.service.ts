/* import { openAIClient } from "../agents/lib/openai/openai.client.js";
import { ollamaClient } from "../agents/lib/ollama/ollama.client.js";
export class EmbeddingService {
	// Create embedding vector from text using Ollama API
	async createEmbedding(text: string): Promise<string> {
		const model =
			process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
		const response = await openAIClient.createEmbedding(text, model);

		// Validate response and extract embedding vector
		if (!response || response.length === 0) {
			throw new Error("No embedding data returned from Ollama API.");
		}

		return response[0]?.embedding || [];
	}
}
 */
