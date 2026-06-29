import type { SourceConfig } from "./registers/source.registry.js";

export const vercelSource: SourceConfig = {
	slug: "vercel",
	name: "Vercel Blog",
	url: "https://vercel.com/blog/rss.xml",
	fetchType: "RSS",
	enabled: false,
};
