import { TechCrunchFetcher } from "../fetchers/techcrunch.fetcher.js";
import { AWSFetcher } from "../fetchers/aws.fetcher.js";
import { RawArticleService } from "../services/raw-artice.service.js";
import { FetchLogService } from "../services/fetch-log.service.js";

const fetchers = [new AWSFetcher()];

async function fetchSources() {
	for (const fetcher of fetchers) {
		const fetchLog = new FetchLogService();
		const fetchLogId = await fetchLog
			.start(await fetcher.getSource().then((source) => source.id))
			.then((log) => log.id);

		// Fetch articles from the source
		const articles = await fetcher.fetch();

		try {
			const rawArticleService = new RawArticleService();

			// Save the fetched articles to the database
			const result = await rawArticleService.saveMany(articles);

			// Update the fetch log with the results of the fetch operation
			await fetchLog.success(fetchLogId, {
				itemsFound: result.processed,
				itemsProcessed: result.success,
			});
		} catch (error) {
			fetchLog.failed(fetchLogId, error);
		}
	}
}

export { fetchSources };
