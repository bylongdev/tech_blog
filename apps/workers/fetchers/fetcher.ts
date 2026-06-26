import parserClient from "../clients/rss.client.js";
import type { IFetcher } from "./IFetcher.js";

const parser = parserClient; // Use the shared parser client with custom request options

export class Fetcher implements IFetcher {
	public sourceId: string;
	public sourceName: string;
	public sourceSlug: string;
	public sourceUrl: string;

	constructor(
		sourceId: string,
		sourceName: string,
		sourceSlug: string,
		url: string,
	) {
		this.sourceId = sourceId;
		this.sourceName = sourceName;
		this.sourceSlug = sourceSlug;
		this.sourceUrl = url;
	}

	public async fetch() {
		const feed = await parser.parseURL(this.sourceUrl);

		if (!feed) {
			throw new Error(`Failed to fetch feed from ${this.sourceUrl}`);
		}

		if (!feed.items || feed.items.length === 0) {
			console.warn(`No items found in feed from ${this.sourceUrl}`);
			return [];
		}

		// Extract image URLs from the raw HTML content of the article
		const getImages = (rawHtml: string) =>
			// Use regex to find all img tags and extract their src attributes
			rawHtml.match(/<img[^>]+src="([^">]+)"/g)?.map((imgTag: string) => {
				// Extract the src attribute value from the img tag
				const srcMatch = imgTag.match(/src="([^">]+)"/);

				return srcMatch ? srcMatch[1] : null;
			}) || [];

		return feed.items.slice(0, 1).map((item: any) => ({
			title: item.title || "",
			link: item.link || "",
			guid: item.guid || "",
			content: item["content:encodedSnippet"] || "",
			summary: item["content:summary"] || "",
			rawHtml: item["content:encoded"] || "",
			author: item.creator || "",
			imageUrl: getImages(item["content:encoded"] || []),
			fetchedAt: new Date(),
			sourceId: this.sourceId,
			...(item.pubDate && {
				publishedAt: new Date(item.pubDate),
			}),
		}));
	}
}
