import type { CreateRawArticleDto } from "@techblog/shared";

export interface IFetcher {
	fetch(): Promise<CreateRawArticleDto[]>;
}
