import { prisma } from "@techblog/database/src/client.js";
import type { IFetcher } from "./IFetcher.js";
import type { CreateRawArticleDto } from "@techblog/shared";

// Tools
import Parser from "rss-parser";
import type { Source } from "./sources/source.type.js";
const parser = new Parser();

export class AWSFetcher implements IFetcher {
	readonly sourceName = "AWS";
	readonly sourceSlug = "aws";

	// Helper method to fetch source details from the database
	async getSource(): Promise<Source> {
		let source: Source;

		try {
			// Fetch the source details from the database using Prisma
			const res = await prisma.source.findUnique({
				where: {
					slug: this.sourceSlug,
				},
				select: {
					id: true,
				},
			});

			if (!res) {
				throw new Error(
					`Source with slug ${this.sourceSlug} not found in database`,
				);
			}

			source = res as Source;
		} catch (error) {
			console.error(
				`Error fetching source with slug ${this.sourceSlug}: ${error}`,
			);
			throw error;
		}

		return source;
	}

	// Fetch articles from the AWS blog RSS feed
	async fetch(): Promise<CreateRawArticleDto[]> {
		try {
			// Use the rss-parser library to fetch and parse the RSS feed from AWS
			const feed = await parser.parseURL(
				"https://aws.amazon.com/blogs/aws/feed/",
			);

			const source = await this.getSource();

			if (!source) {
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
				sourceId: source.id,
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
