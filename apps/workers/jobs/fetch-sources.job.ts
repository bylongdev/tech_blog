import { prisma } from "@techblog/database/src/client.js";
import { Fetcher } from "../fetchers/fetcher.js";

// Services
import { RawArticleService } from "../services/raw-article.service.js";
import { FetchLogService } from "../services/fetch-log.service.js";

async function fetchSources() {
	const sources = await prisma.source.findMany({
		where: {
			fetchType: "RSS",
			enabled: true,
		},
	});

	for (const source of sources) {
		// Log the start of the fetch operation for this source
		const fetchLog = new FetchLogService();
		const fetchLogId = (await fetchLog.start(source.id)).id;

		if (!source.url) {
			console.warn(
				`Source ${source.name} does not have a URL. Skipping fetch.`,
			);
			await fetchLog.failed(fetchLogId, new Error("Source URL is missing"));
			continue;
		}

		try {
			/* If it a custom Fetcher, we call it instead of this Fetcher */
			// Find the corresponding fetcher for this source
			const fetcher = new Fetcher(
				source.id,
				source.name,
				source.slug,
				source.url,
			);

			// Fetch articles from the source
			const articles = await fetcher.fetch();

			// Save the fetched articles to the database
			const rawArticleService = new RawArticleService();
			const result = await rawArticleService.saveMany(articles);

			// Update the fetch log with the results of the fetch operation
			await fetchLog.success(fetchLogId, {
				itemsFound: result.processed,
				itemsProcessed: result.success,
			});
		} catch (error) {
			console.error(
				`Error fetching articles for source ${source.name}:`,
				error,
			);
			await fetchLog.failed(fetchLogId, error);
			continue; // Move on to the next source even if this one fails
		}
	}
}

export { fetchSources };
