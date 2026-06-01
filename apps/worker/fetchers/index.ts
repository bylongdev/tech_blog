import { TechCrunchFetcher } from "./techcrunch.fetcher.js";
import { RawArticleService } from "../services/rawArticle.service.js";

const fetchers = [new TechCrunchFetcher()];

for (const fetcher of fetchers) {
	const articles = await fetcher.fetch();

	const rawArticleService = new RawArticleService();
	await rawArticleService.saveMany(articles);

	console.log(fetcher.sourceName, articles.length);
}
