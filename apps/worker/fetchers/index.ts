import { TechCrunchFetcher } from "./techcrunch.fetcher.js";

const fetchers = [new TechCrunchFetcher()];

for (const fetcher of fetchers) {
	const articles = await fetcher.fetch();

	console.log(fetcher.sourceName, articles.length);
}
