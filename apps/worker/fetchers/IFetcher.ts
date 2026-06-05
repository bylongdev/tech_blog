import type { CreateRawArticleDto } from "@techblog/shared";

export interface IFetcher {
	readonly sourceName: string;
	readonly sourceSlug: string;

	fetch(): Promise<CreateRawArticleDto[]>;
}
