export interface CreateRawArticleDto {
	title: string;
	link: string;
	guid: string;
	content?: string;
	rawHtml?: string;
	author?: string;
	publishedAt?: Date;
	sourceId: string;
	fetchedAt: Date;
}
