// fetchers/azure.source.ts
import type { SourceConfig } from "./registers/source.registry.js";

export const azureSource: SourceConfig = {
	slug: "azure",
	name: "Azure Blog",
	url: "https://azure.microsoft.com/en-us/blog/feed/",
	fetchType: "RSS",
	enabled: true,
};
