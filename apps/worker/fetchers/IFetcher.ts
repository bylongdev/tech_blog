import type { RawArticleDTO } from "@techblog/shared";

export interface IFetcher {
	readonly sourceSlug: string;
	readonly sourceName: string;

	fetch(): Promise<RawArticleDTO[]>;
}
