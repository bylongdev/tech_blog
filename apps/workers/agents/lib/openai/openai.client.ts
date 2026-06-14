import OpenAI from "openai";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), "../../../../../.env") });

const API_KEY = process.env.OPENAI_API_KEY;

class OpenAIClient {
	private client: OpenAI;

	constructor() {
		if (!API_KEY) {
			throw new Error(
				"OPENAI_API_KEY is not defined in the environment variables.",
			);
		}

		this.client = new OpenAI({ apiKey: API_KEY });
	}

	// Method to create embeddings using the OpenAI API
	/* async createEmbedding(input: string | string[], model: string) {
		try {
			// Validate input before making the API call
			if (!input || (Array.isArray(input) && input.length === 0)) {
				throw new Error("Input for embedding cannot be empty.");
			}

			// Make the API call to create embeddings
			const response = await this.client.embeddings.create({
				input,
				model,
			});

			// Validate response from the API
			if (!response || !response.data || response.data.length === 0) {
				throw new Error("No embedding data returned from OpenAI API.");
			}

			return response.data;
		} catch (error) {
			console.error("Error creating embedding:", error);
			throw error;
		}
	} */
}

export const openAIClient = new OpenAIClient();
