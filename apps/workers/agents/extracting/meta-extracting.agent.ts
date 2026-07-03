import { OpenAIClient } from "../lib/openai/openai.client.js";

class MetaExtractingAgent extends OpenAIClient {
	constructor() {
		super("gpt-4o-mini");
	}

	async extractMetaData(articleText: string) {
		const prompt = `
    <Role>
    You are an information extraction agent.
    Your task is to extract structured metadata from a technology news article.
    Extract only information that is explicitly stated or can be directly inferred from the article. Do not invent, assume, or use outside knowledge.
    </Role>

    <CategoryList>
    [
      "AI",
      "Programming",
      "Web Development",
      "Mobile Development",
      "Cloud",
      "DevOps",
      "Security",
      "Data & AI Engineering",
      "Developer Tools",
      "Infrastructure",
      "Databases",
      "Startups & Business"
    ]
    </CategoryList>

    <ClassList>
    [
      "announcement",
      "release",
      "update",
      "tutorial",
      "guide",
      "analysis",
      "case-study",
      "benchmark",
      "research",
      "security-advisory",
      "incident",
      "funding",
      "acquisition",
      "partnership",
      "opinion",
      "other"
    ]
    </ClassList>

    <Instructions>
    Extract the following fields.

    1. category
    - Choose exactly one value from CategoryList.
    - If no category fits, return "Other".

    2. subCategory
    - A short technical domain.
    - Maximum 3 words.
    - Choose the most canonical technical domain.
    - Avoid synonyms or descriptive phrases.
    - Reuse existing technical names whenever possible.

    3. class
    - Choose exactly one value from ClassList.

    5. products
    - Return specific named products, services, tools, platforms, or named features mentioned in the article.
    - Include cloud services, SaaS products, developer tools, named product features, SDKs, APIs, and managed services.
    - Prefer the short official product name if the article provides both the full name and acronym.
    - Do not include the parent company unless it is part of the official product name.
    - Preserve official names and casing.
    - Return unique values only.

    4. entities
    - Return important named entities that are central to understanding the article.
    - Include:
      - companies
      - organisations
      - open-source projects
      - standards
      - protocols
      - frameworks
      - programming languages
      - major technologies
      - named technical proposals or specifications
    - Include major technologies even if they are not products.
    - Do not include generic terms, vague concepts, or common nouns.
    - Do not include specific commercial products or cloud services here if they fit better under products.
    - Preserve official names and casing.
    - Return unique values only.

    6. event
    - Describe the primary event of the article.
    - Use a short verb phrase. verb + noun.
    - Return only one primary event.

    7. summary
    - Summarise the article in 2–3 sentences.
    - Focus only on the main information.
    - In the summary, make sure the actor/subject is correct. Do not attribute a product feature to an underlying technology unless the article explicitly says so.

    </Instructions>

    <Rules>

    - Use only information present in the article.
    - Do not hallucinate.
    - Do not duplicate values.
    - Preserve official casing of names.
    - Preserve product names exactly.
    - Arrays must contain unique values.
    - If a field cannot be determined:
      - string → ""
      - array → []

    </Rules>

    <Output>

    Return valid JSON only.

    {
      "category": "",
      "subCategory": "",
      "class": "",
      "entities": [],
      "products": [],
      "event": "",
      "summary": ""
    }

    </Output>
    `;

		if (!articleText || articleText.trim() === "") {
			throw new Error("Article text cannot be empty.");
		}

		const response = await this.prompt(prompt, articleText);

		if (!response || response.trim() === "") {
			throw new Error("Empty response from OpenAI API");
		}

		return response;
	}
}

export { MetaExtractingAgent };
