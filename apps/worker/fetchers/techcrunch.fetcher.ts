import type { IFetcher } from "./IFetcher.js";
import type { RawArticleDTO } from "@techblog/shared";

// Tools
import Parser from "rss-parser";

const parser = new Parser();

export class TechCrunchFetcher implements IFetcher {
	readonly sourceSlug = "techcrunch";
	readonly sourceName = "TechCrunch";

	async fetch(): Promise<RawArticleDTO[]> {
		try {
			// TechCrunch's RSS feed is available at https://techcrunch.com/feed/
			const feed = await parser.parseURL("https://techcrunch.com/feed/");

			if (!feed) {
				throw new Error("Failed to fetch TechCrunch feed");
			}

			return feed.items.map((item) => ({
				title: item.title || "",
				link: item.link || "",
				guid: item.guid || "",
				content: item.content || "",
				author: item.creator || "",
				fetchedAt: new Date(),
				...(item.pubDate && {
					publishedAt: new Date(item.pubDate),
				}),
			}));
		} catch (error) {
			console.error("Error fetching TechCrunch feed:", error);
		}

		return [];
	}
}
