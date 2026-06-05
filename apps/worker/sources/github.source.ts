// fetchers/github.source.ts
import type { SourceConfig } from "../registers/source.registry.js";

export const githubSource: SourceConfig = {
	slug: "github",
	name: "GitHub Blog",
	url: "https://github.blog/feed/",
	fetchType: "RSS",
};
