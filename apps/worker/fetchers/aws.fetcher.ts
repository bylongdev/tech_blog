import { prisma } from "@techblog/database/src/client.js";
import type { IFetcher } from "./IFetcher.js";
import type { RawArticleDTO } from "@techblog/shared";

// Tools
import Parser from "rss-parser";
const parser = new Parser();

export class AWSFetcher implements IFetcher {
	readonly sourceSlug = "aws";
	readonly sourceName = "AWS";

	async fetch(): Promise<RawArticleDTO[]> {
		try {
			const feed = await parser.parseURL(
				"https://aws.amazon.com/blogs/aws/feed/",
			);

			const sourceId = await prisma.source.findUnique({
				where: {
					slug: this.sourceSlug,
				},
				select: {
					id: true,
				},
			});

			if (!sourceId) {
				throw new Error(
					`Source with slug ${this.sourceSlug} not found in database`,
				);
			}

			if (!feed) {
				throw new Error("Failed to fetch AWS feed");
			}

			return feed.items.map((item) => ({
				title: item.title || "",
				link: item.link || "",
				guid: item.guid || "",
				content: item.content || "",
				author: item.creator || "",
				fetchedAt: new Date(),
				sourceId: sourceId.id,
				...(item.pubDate && {
					publishedAt: new Date(item.pubDate),
				}),
			}));
		} catch (error) {
			console.error(`Error fetching AWS feed: ${error}`);
			return [];
		}
	}
}
