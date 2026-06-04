import { TechCrunchFetcher } from "../fetchers/techcrunch.fetcher.js";
import { AWSFetcher } from "../fetchers/aws.fetcher.js";
import { RawArticleService } from "../services/raw-artice.service.js";
import { FetchLogService } from "../services/fetch-log.service.js";

const fetchers = [new AWSFetcher()];

for (const fetcher of fetchers) {
	const fetchLogService = new FetchLogService();
	const fetchLog = await fetchLogService.start(
		await fetcher.getSource().then((source) => source.id),
	);

	// Fetch articles from the source
	const articles = await fetcher.fetch();

	const rawArticleService = new RawArticleService();
	await rawArticleService.saveMany(articles);

	console.log(fetcher.sourceName, articles.length);
}
