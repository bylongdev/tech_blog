export interface CreateRawArticleDto {
	title: string;
	link: string;
	guid: string;
	content?: string;
	summary?: string;
	rawHtml?: string;
	author?: string;
	imageUrl?: string[];
	publishedAt?: Date;
	sourceId: string;
	fetchedAt: Date;
}
