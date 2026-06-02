// fetchers/openai.source.ts
import type { SourceConfig } from "../registers/source.registry.js";

export const openaiSource: SourceConfig = {
	slug: "openai",
	name: "OpenAI Blog",
	url: "https://openai.com/blog/rss/",
	fetchType: "RSS",
};
