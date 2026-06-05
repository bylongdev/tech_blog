// Fetcher Implementations
import { AWSFetcher } from "./aws.fetcher.js";

// Article Service
import { RawArticleService } from "../services/rawArticle.service.js";

// Source Management
import { registerSources } from "./registers/registerSources.js";

// Database
import { prisma } from "@techblog/database/src/client.js";

async function main() {
	await registerSources();

	// Initialize fetchers for each source
	const fetchers = [new AWSFetcher()];

	// Fetch articles from each source and save them to the database
	for (const fetcher of fetchers) {
		const articles = await fetcher.fetch();

		// Save the fetched articles to the database using the RawArticleService
		const rawArticleService = new RawArticleService();
		// await rawArticleService.saveMany(articles);
	}
}

main()
	.catch(console.error)
	.finally(async () => {
		// Perform any necessary cleanup here, such as closing database connections or releasing resources.
		await prisma.$disconnect();
	});
