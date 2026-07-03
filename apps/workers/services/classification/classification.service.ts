import { OpenAIClient } from "../../agents/lib/openai/openai.client.js";

class ClassificationService {
	private client = new OpenAIClient("gpt-4o");

	public async classify(input: string): Promise<string> {
		try {
			if (!input || input.trim() === "") {
				throw new Error("Input for article categorising cannot be empty.");
			}

			const PROMPT = `
							You are an expert in classifying articles into categories, types, and subcategories.

							Rules:
							- category must be one of the following: [AI, Programming, Web Development, Cloud, DevOps, Security, Data & AI Engineering, Developer Tools, Infrastructure, Startups & Business]
							- type must be one of the following: [Tutorial, News, Opinion, Review, Case Study, Interview, Guide, Announcement]
							- subCategory should be short, max 3 words. Must be relevant to the article's content.
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

							`.trim();

			const response = await this.client.prompt(PROMPT, input.trim());

			return response;
		} catch (error) {
			console.error("Error in classify:", error);
			throw error;
		}
	}
}

export const classificationService = new ClassificationService();
