import {
	TAG_EXTRACTING_PROMPT,
	CONCEPT_NORMALIZATION_PROMPT,
	CONCEPT_RATING_PROMPT,
} from "../prompts/keyword-extracting.prompt.js";

class OllamaClient {
	private readonly apiUrl = "http://localhost:11434/";
	private readonly model = "qwen3.5:latest";
	private readonly title: string;

	constructor(title: string) {
		this.title = title;
	}

	async extractConcepts(input: string): Promise<string> {
		try {
			const PROMPT = TAG_EXTRACTING_PROMPT.replace("{{INPUT}}", input);

			const response = await fetch(`${this.apiUrl}/api/generate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: this.model,
					prompt: PROMPT,
					stream: false,
					think: false,
					format: "json",
					options: {
						temperature: 0,
						seed: 42,
						num_predict: 1024,
					},
				}),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`Error extracting concepts: ${response.status} ${response.statusText} - ${errorText}`,
				);
			}

			// Parse the response as JSON and extract the concept data
			const data = await response.json();

			if (!data || !data.response) {
				throw new Error("No concept data returned from Ollama API.");
			}

			const normalizedConcepts = await this.normalizeConcept(
				JSON.parse(data.response).concepts,
			);

			const filteredConcepts = await this.filterConcept(
				JSON.parse(normalizedConcepts).concepts,
			);

			return JSON.parse(filteredConcepts); // Return the filtered concepts as a string
		} catch (error) {
			console.error("Error extracting concepts:", error);
			throw error;
		}
	}

	private async normalizeConcept(concept: string[]): Promise<string> {
		try {
			const PROMPT = CONCEPT_NORMALIZATION_PROMPT.replace(
				"{{INPUT}}",
				JSON.stringify(concept, null, 2),
			);

			const response = await fetch(`${this.apiUrl}/api/generate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: this.model,
					prompt: PROMPT,
					stream: false,
					think: false,
					format: "json",
					options: {
						temperature: 0,
						seed: 42,
						num_predict: 1024,
					},
				}),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`Error normalizing concept: ${response.status} ${response.statusText} - ${errorText}`,
				);
			}

			// Parse the response as JSON and extract the normalized concept
			const data = await response.json();

			if (!data || !data.response) {
				throw new Error("No normalized concept data returned from Ollama API.");
			}

			return data.response; // Return the normalized concept as a string
		} catch (error) {
			console.error("Error normalizing concept:", error);
			throw error;
		}
	}

	private async filterConcept(concept: string[]): Promise<string> {
		const PROMPT = CONCEPT_RATING_PROMPT.replace(
			"{{INPUT}}",
			JSON.stringify(concept, null, 2),
		).replace("{{TITLE}}", this.title);

		const response = await fetch(`${this.apiUrl}/api/generate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: this.model,
				prompt: PROMPT,
				stream: false,
				think: false,
				format: "json",
				options: {
					temperature: 0.1,
					top_p: 0.9,
					seed: 42,
					num_predict: 512,
				},
			}),
		});

		// Check if the response is successful
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Error filtering concept: ${response.status} ${response.statusText} - ${errorText}`,
			);
		}

		// Parse the response as JSON and extract the filtered concept
		const data = await response.json();
		if (!data || !data.response) {
			throw new Error("No filtered concept data returned from Ollama API.");
		}

		console.log("Filtered Concepts Response:", data.response); // Log the raw response for debugging

		// Implement filtering logic based on the PROMPT and return the filtered concepts
		return data.response; // Placeholder implementation, replace with actual filtering logic
	}
}

export { OllamaClient };
