import type { RawArticleDTO } from "@techblog/shared";

interface IFetcher {
	sourceName: string;
	fetch: () => Promise<RawArticleDTO[]>;
}
