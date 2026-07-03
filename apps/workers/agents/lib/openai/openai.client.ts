/* 
	Description: This file defines the OpenAIClient class, which is a wrapper around the OpenAI API client. It provides methods to interact with the OpenAI API, specifically for generating responses based on prompts and inputs. The class handles API key management, model selection, and error handling for API requests.
*/

import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), "../../../../../.env") });

const API_KEY = process.env.OPENAI_API_KEY;

class OpenAIClient extends OpenAI {
	private client: OpenAI; // Instance of the OpenAI client
	private readonly model: string; // Model to be used for generating responses

	constructor(model?: string) {
		super();

		// Check if the API key is defined in the environment variables. If not, throw an error.
		if (!API_KEY) {
			throw new Error(
				"OPENAI_API_KEY is not defined in the environment variables.",
			);
		}

		this.client = new OpenAI({ apiKey: API_KEY });
		this.model = model || process.env.OPENAI_DEFAULT_MODEL || "gpt-4";
	}

	/* 
		This method sends a prompt and input to the OpenAI API and returns the generated response.
		It validates the prompt and input to ensure they are not empty, and handles errors that may occur during the API call.
	*/
	async prompt(prompt: string, input: string, schema: object): Promise<JSON> {
		try {
			/* 
			Validate the prompt and input to ensure they are not empty or just whitespace.
			If either is invalid, an error is thrown with a descriptive message.
			*/
			if (!prompt || prompt.trim() === "") {
				throw new Error("Prompt for prompt cannot be empty.");
			}

			if (!input || input.trim() === "") {
				throw new Error("Input for prompt cannot be empty.");
			}

			/* 
			Send the prompt and input to the OpenAI API and return the generated response.
			*/
			const response = await this.client.responses.create({
				model: this.model,
				input: [
					{
						role: "system",
						content: prompt,
					},
					{
						role: "user",
						content: input,
					},
				],
				text: {
					format: {
						type: "json_schema",
						name: "article_metadata",
						strict: true,
						schema: {
							...schema,
						},
					},
				},
			});

			// Validate response from the API
			if (
				!response ||
				!response.output_text ||
				response.output_text.trim() === ""
			) {
				throw new Error("No data returned from OpenAI API for prompt.");
			}

			const metadata: JSON = JSON.parse(response.output_text.trim());

			return metadata;
		} catch (error) {
			console.error("Error in prompt:", error);
			throw error;
		}
	}
}

export { OpenAIClient };
