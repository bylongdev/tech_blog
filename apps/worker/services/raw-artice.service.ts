import { prisma } from "@techblog/database/src/client.js";
import type { CreateRawArticleDto } from "@techblog/shared";

export class RawArticleService {
	// CRUD operations for RawArticle
	async saveMany(articles: CreateRawArticleDto[]) {
		for (const article of articles) {
			const data = this.mapToPrismaData(article); // Map the DTO to the format expected by Prisma

			// Upsert the article based on its link to avoid duplicates
			await prisma.rawArticle.upsert({
				where: {
					link: article.link, // 'link' is unique for each article
				},
				update: { ...data },
				create: {
					...data,
				},
			});
		}
	}

	// Helper method to map CreateRawArticleDto to the format expected by Prisma
	private mapToPrismaData(article: CreateRawArticleDto) {
		return {
			sourceId: article.sourceId,
			title: article.title,
			link: article.link,
			guid: article.guid,
			content: article.content ?? null,
			author: article.author ?? null,
			publishedAt: article.publishedAt ?? null,
			fetchedAt: article.fetchedAt,
		};
	}
}
