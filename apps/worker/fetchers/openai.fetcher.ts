import { prisma } from "@techblog/database/src/client.js";
import type { IFetcher } from "./IFetcher.js";
import type { CreateRawArticleDto } from "@techblog/shared";

// Types
import type { Source } from "../types/source.type.js";

// Tools
import parserClient from "../clients/rss.client.js";

const parser = parserClient; // Use the shared parser client with custom request options

export class OpenAIFetcher implements IFetcher {
	readonly sourceName = "Open AI";
	readonly sourceSlug = "openai";

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

	// Fetch articles from the Open AI blog RSS feed
	async fetch(): Promise<CreateRawArticleDto[]> {
		try {
			// Use the rss-parser library to fetch and parse the RSS feed from Open AI
			const source = await this.getSource();
			const feed = await parser.parseURL(
				source.url || "https://openai.com/blog/rss.xml/",
			);

			if (!source) {
				throw new Error(
					`Source with slug ${this.sourceSlug} not found in database`,
				);
			}
			if (!feed) {
				throw new Error("Failed to fetch Open AI feed");
			}

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
			console.error(`Error fetching Open AI feed: ${error}`);
			throw error;
		}
	}
}
