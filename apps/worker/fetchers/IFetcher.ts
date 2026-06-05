import type { CreateRawArticleDto } from "@techblog/shared";
import type { Source } from "@techblog/database/src/types/source.type.js";

export interface IFetcher {
	readonly sourceName: string;
	readonly sourceSlug: string;

	fetch(): Promise<CreateRawArticleDto[]>;
}
