import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";
import { prisma } from "@techblog/database/src/client.js";
import { GroupingService } from "./services/article-grouping.service.js";

import Parser from "rss-parser";
const parser = new Parser();

async function main() {
	await registerSources();
	await fetchSources();

	await parser
		.parseURL("https://blog.cloudflare.com/rss")
		.then((feed) => {
			feed.items.forEach(async (item) => {
				const articleId = item.guid || item.link;
				console.log("Processing article:", Object.keys(item), item.content);
				if (!articleId) return;
			});
		})
		.catch((error) => {
			console.error("Error parsing RSS feed:", error);
		});
}

main()
	.catch((error) => {
		console.error("Error in worker:", error);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Worker finished.");
	});
