import { prisma } from "@techblog/database/src/client.js";
import type { IFetcher } from "./IFetcher.js";
import type { CreateRawArticleDto } from "@techblog/shared";

// Tools
import Parser from "rss-parser";
import type { Source } from "@techblog/database/src/types/source.type.js";
const parser = new Parser();

export class AWSFetcher implements IFetcher {
	readonly sourceName = "AWS";
	readonly sourceSlug = "aws";

	async fetch(): Promise<CreateRawArticleDto[]> {
		try {
			const feed = await parser.parseURL(
				"https://aws.amazon.com/blogs/aws/feed/",
			);

			const sourceId = await prisma.source.findUnique({
				where: {
					slug: "aws",
				},
				select: {
					id: true,
				},
			});

			if (!sourceId) {
				throw new Error(`Source with slug aws not found in database`);
			}

			if (!feed) {
				throw new Error("Failed to fetch AWS feed");
			}

			feed.items.forEach((item) => {
				console.log(
					`guid: ${item.guid}, title: ${item.title}, link: ${item.link}`,
				);
			});

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
