import { OllamaClient } from "../agents/lib/ollama/ollama.client.js";

export class ConceptExtractingService {
	private readonly ollamaClient: OllamaClient;

	constructor(title: string) {
		this.ollamaClient = new OllamaClient(title);
	}

	async extract(text: string): Promise<Object> {
		// Placeholder for concept extraction logic
		// This could involve calling an external API, using NLP libraries, etc.

		const response = await this.ollamaClient.extractConcepts(text);

		if (!response) {
			throw new Error("No concepts extracted from the provided text.");
		}

		return response; // Return the extracted concepts
	}
}
