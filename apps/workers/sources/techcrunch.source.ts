// fetchers/techcrunch.source.ts
import type { SourceConfig } from "./registers/source.registry.js";

export const techcrunchSource: SourceConfig = {
	slug: "techcrunch",
	name: "TechCrunch",
	url: "https://techcrunch.com/feed/",
	fetchType: "HTML",
	enabled: false,
};
