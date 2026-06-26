// fetchers/cloudflare.source.ts
import type { SourceConfig } from "./registers/source.registry.js";

export const cloudflareSource: SourceConfig = {
	slug: "cloudflare",
	name: "Cloudflare Blog",
	url: "https://blog.cloudflare.com/rss",
	fetchType: "RSS",
	enabled: true,
};
