export interface CreateRawArticleDto {
	title: string;
	link: string;
	guid: string;
	content?: string;
	author?: string;
	publishedAt?: Date;
	sourceId: string;
	fetchedAt: Date;
}
