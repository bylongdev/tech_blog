import type { RawArticleDTO } from "@techblog/shared";

export interface IFetcher {
	readonly sourceSlug: string;

	fetch(): Promise<RawArticleDTO[]>;
}
