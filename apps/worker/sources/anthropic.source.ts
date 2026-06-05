// fetchers/aws.source.ts
import type { SourceConfig } from "../sources/registers/source.registry.js";

export const anthropicSource: SourceConfig = {
	slug: "anthropic",
	name: "Anthropic Blog",
	url: "https://www.anthropic.com/blog/rss/",
	fetchType: "RSS",
	enabled: false,
};
