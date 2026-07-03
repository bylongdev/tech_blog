import { CategorisingService } from "../../services/classification/group-categorising.service.js";
import { openAIClient } from "../lib/openai/openai.client.js";

export class CategorisingAgent {
	private categorisingService = new CategorisingService();

	async process(
		articles: Array<{
			cleanedTitle: string;
			embeddingText: string;
			sourceName: string;
		}>,
	) {
		const model = process.env.OPENAI_CATEGORISING_MODEL || "gpt-4o-mini";
		const response = await openAIClient.groupCategorising(articles, model);

		if (!response || response.length === 0) {
			throw new Error("No embedding data returned from Ollama API.");
		}

		return response;
	}
}
