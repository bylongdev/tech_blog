import { prisma } from "@techblog/database/src/client.js";
import type { IFetcher } from "./IFetcher.js";
import type { CreateRawArticleDto } from "@techblog/shared";
import type { Source } from "../types/source.type.js";

// Tools
import parserClient from "../clients/rss.client.js";

const parser = parserClient; // Use the shared parser client with custom request options

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
			const source = await this.getSource();
			const feed = await parser.parseURL(
				source.url || "https://aws.amazon.com/blogs/aws/feed/",
			);

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

			const item = feed.items[0];
			if (item) {
				console.log(Object.entries(item));
				console.log(item["content:encodedSnippet"]);
			}

			return feed.items.map((item) => ({
				title: item.title || "",
				link: item.link || "",
				guid: item.guid || "",
				content: item["content:encodedSnippet"] || "",
				rawHtml: item["content:encoded"] || "",
				author: item.creator || "",
				fetchedAt: new Date(),
				sourceId: source.id,
				...(item.pubDate && {
					publishedAt: new Date(item.pubDate),
				}),
			}));
		} catch (error) {
			console.error(`Error fetching AWS feed: ${error}`);
			throw error;
		}
	}
}
