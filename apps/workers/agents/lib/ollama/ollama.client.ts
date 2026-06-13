import { TAG_EXTRACTING_PROMPT } from "../prompts/keyword-extracting.prompt.js";

class OllamaClient {
	private readonly apiUrl = "http://localhost:11434/";
	private readonly model = "qwen3.5:latest";

	constructor() {}

	async canonicalTitleExtracting(input: string) {
		try {
			/* const PROMPT = `You are an expert technology news analyst.

      Your task is to extract structured metadata from a technology news article.

      Rules:

      - Return valid JSON only.
      - Do not output markdown, code fences or explanations.
      - Extract information only from the provided input.
      - Do not infer or invent missing information.
      - If a value cannot be determined confidently, return an empty string ("") or empty array ([]).
      - Preserve official company, product and project names exactly as written.
      - Never abbreviate, simplify or rename official product names.
      - Ignore marketing phrases such as:
      "Introducing", "Latest", "New", "Try", "Experience", "Discover", "Learn", "Next Generation", "Now Available", "Announcing".
      - Extract only the primary subject of the article, not secondary mentions.
      - Topics must be selected only from the predefined topic list.
      - Keywords should contain 3-6 important technical terms or concepts.
      - Do not include company names, entity names or generic words such as:
      "announcement", "release", "update", "feature", "news".
      - Summary must be a single sentence under 25 words describing the main announcement.
      - If multiple products are mentioned, choose the one that is the central focus of the article as the entity.


      Topics MUST come from this list:
      [
        "ai",
        "cloud",
        "community",
        "developer_tools",
        "programming",
        "database",
        "security",
        "infrastructure",
        "open_source",
        "mobile",
        "web",
        "hardware",
        "business"
      ]

      News Type:[
      "release" - for new product or feature releases
      "update" - for updates to existing products or services
      "community" - for news about the community, events, or people
      "tutorial" - for educational content or how-tos
      "opinion" - for opinion pieces or analysis
      "security" - for security-related news
      "research" - for research papers or findings
      "business" - for business-related news such as earnings, partnerships, or acquisitions
      "other" - for news that doesn't fit into the above categories
      ]

      Output schema:

      {
        "company": "",
        "entity": "",
        "topics": [],
        "keywords": [],
        "newsType": ""
        "summary": ""
      }

      Definitions:

      - company:
        The organisation behind the announcement.

      - entity:
        The primary product, service or project discussed.

      - topics:
        Choose 1-3 items from the predefined topic list.

      - keywords:
        Important search terms from the article.

      - summary:
        One sentence under 30 words describing the core announcement.

      Example Output:

      {
        "company": "GitHub",
        "entity": "GitHub Copilot CLI",
        "topics": [
          "ai",
          "developer_tools",
          "programming"
        ],
        "keywords": [
          "GitHub Copilot CLI",
          "Language Server",
          "Code Intelligence"
        ],
        "newsType": "community",
        "summary": "GitHub Copilot CLI adds language server integration for richer code intelligence."
      }

      Now extract metadata from the following article.

      
      INPUT:
      {${input}}
      `; */

			const PROMPT = TAG_EXTRACTING_PROMPT.replace("{{INPUT}}", input);

			const response = await fetch(`${this.apiUrl}/api/generate`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					model: this.model,
					prompt: PROMPT,
					stream: false,
					think: false,
					options: {
						temperature: 0,
						top_p: 0.1,
						seed: 42,
						num_predict: 160,
					},
				}),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`Error creating embedding: ${response.status} ${response.statusText} - ${errorText}`,
				);
			}

			const data = await response.json();

			return data;
			/* if (!data || !data.data || data.data.length === 0) {
				throw new Error("No embedding data returned from Ollama API.");
			}
			return data.data; */
		} catch (error) {
			console.error("Error creating embedding:", error);
			throw error;
		}
	}
}

export const ollamaClient = new OllamaClient();
