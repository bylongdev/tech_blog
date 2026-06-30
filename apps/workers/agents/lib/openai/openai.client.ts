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
	async createEmbedding(input: string | string[], model: string) {
		try {
			// Validate input before making the API call
			if (!input || (Array.isArray(input) && input.length === 0)) {
				throw new Error("Input for embedding cannot be empty.");
			}

			console.log(
				`Creating embedding for input: ${Array.isArray(input) ? input.slice(0, 5) : input}... using model: ${model}`,
			);

			// Make the API call to create embeddings
			const response = await this.client.embeddings.create({
				input,
				model,
			});

			console.log("Embedding response received from OpenAI API.");

			// Validate response from the API
			if (!response || !response.data || response.data.length === 0) {
				throw new Error("No embedding data returned from OpenAI API.");
			}

			// Return the embedding vector from the response
			console.log(
				`Embedding vector created with length: ${response.data[0]?.embedding.length}`,
			);

			return response.data;
		} catch (error) {
			console.error("Error creating embedding:", error);
			throw error;
		}
	}

	async groupCategorising(
		input: Array<{
			cleanedTitle: string;
			embeddingText: string;
			sourceName: string;
		}>,
		model: string,
	) {
		try {
			// Validate input before making the API call
			if (!input || input.length === 0) {
				throw new Error("Input for categorising cannot be empty.");
			}

			console.log(
				`Creating embedding for input: ${Array.isArray(input) ? input.slice(0, 5) : input}... using model: ${model}`,
			);

			// Make the API call to create embeddings
			const response = await this.client.responses.parse({
				model,
				input: [
					{
						role: "system",
						content: `
						Classify this article group.

						Rules:
						- category must be one of the allowed enum values.
						- type must be one of the allowed enum values.
						- subCategory should be short, max 3 words.
						- Use the overall topic of the group, not just the vendor.
						- Return structured JSON only.
       		`.trim(),
					},
					{
						role: "user",
						content: JSON.stringify({ articles: input }),
					},
				],
			});

			// Validate response from the API
			if (!response) {
				throw new Error("No data returned from OpenAI API.");
			}

			const result = (response.output_text =
				response.output_text?.trim() || "");

			return result;
		} catch (error) {
			console.error("Error in groupCategorising:", error);
			throw error;
		}
	}

	async articleCategorising(input: string): Promise<string> {
		try {
			if (!input || input.trim() === "") {
				throw new Error("Input for article categorising cannot be empty.");
			}

			const model = process.env.OPENAI_ARTICLE_CATEGORISING_MODEL || "gpt-4o";

			const response = await this.client.responses.parse({
				model,
				input: [
					{
						role: "system",
						content: `
							You are an expert in classifying articles into categories, types, and subcategories.

							Rules:
							- category must be one of the following: [AI, Programming, Web Development, Cloud, DevOps, Security, Data & AI Engineering, Developer Tools, Infrastructure, Startups & Business]
							- type must be one of the following: [Tutorial, News, Opinion, Review, Case Study, Interview, Guide, Announcement]
							- subCategory should be short, max 3 words.
							- Use the overall topic of the article, not just the vendor.
							- If no category is a good fit, choose the closest matching category.
							- Return structured JSON only.
							
							Constraints:
							- Output must be valid JSON.
							- Do not include any additional text or explanation.
							- Do not include any HTML or Markdown formatting.
							- Do not include any special characters outside of the JSON structure.
							- Ensure that the output is parsable by a JSON parser.

							Output format:
							{
								"category": "string",
								"type": "string",
								"subCategory": "string"
							}

							Input: ${input}

							`.trim(),
					},
					{
						role: "user",
						content: input,
					},
				],
			});

			if (
				!response ||
				!response.output_text ||
				response.output_text.trim() === ""
			) {
				throw new Error(
					"No data returned from OpenAI API for article categorising.",
				);
			}

			const result = response.output_text.trim();

			return result;
		} catch (error) {
			console.error("Error in articleCategorising:", error);
			throw error;
		}
	}
}

export const openAIClient = new OpenAIClient();
