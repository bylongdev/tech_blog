import { AWSFetcher } from "../fetchers/aws.fetcher.js";
import { OpenAIFetcher } from "../fetchers/openai.fetcher.js";
import { GitHubFetcher } from "../fetchers/github.fetcher.js";

import { RawArticleService } from "../services/raw-artice.service.js";
import { FetchLogService } from "../services/fetch-log.service.js";

// const fetchers = [new AWSFetcher(), new OpenAIFetcher(), new GitHubFetcher()];
const fetchers = [new GitHubFetcher()];

async function fetchSources() {
	for (const fetcher of fetchers) {
		const fetchLog = new FetchLogService();
		const fetchLogId = (
			await fetchLog.start(
				await fetcher.getSource().then((source) => source.id),
			)
		).id;

		try {
			// Fetch articles from the source
			const articles = await fetcher.fetch();

			const rawArticleService = new RawArticleService();

			// Save the fetched articles to the database
			const result = await rawArticleService.saveMany(articles);

			// Update the fetch log with the results of the fetch operation
			await fetchLog.success(fetchLogId, {
				itemsFound: result.processed,
				itemsProcessed: result.success,
			});
		} catch (error) {
			console.error(
				`Error fetching articles for source ${fetcher.sourceName}:`,
				error,
			);
			await fetchLog.failed(fetchLogId, error);
			continue; // Move on to the next fetcher even if this one fails
		}
	}
}

export { fetchSources };
