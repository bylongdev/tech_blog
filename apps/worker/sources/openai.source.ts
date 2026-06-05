// fetchers/openai.source.ts
import type { SourceConfig } from "../sources/registers/source.registry.js";

export const openaiSource: SourceConfig = {
	slug: "openai",
	name: "OpenAI Blog",
	url: "https://openai.com/blog/rss.xml",
	fetchType: "HTML",
	enabled: false,
};
