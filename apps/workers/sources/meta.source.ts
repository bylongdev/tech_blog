// fetchers/aws.source.ts
import type { SourceConfig } from "./registers/source.registry.js";

export const metaSource: SourceConfig = {
	slug: "meta",
	name: "Meta Blog",
	url: "https://engineering.fb.com/feed/",
	fetchType: "RSS",
	enabled: true,
};
