import { prisma } from "@techblog/database/src/client.js";
import type { CreateRawArticleDto } from "@techblog/shared";

export class RawArticleService {
	// CRUD operations for RawArticle
	async saveMany(articles: CreateRawArticleDto[]) {
		const result = await Promise.all(
			articles.map(async (article) => {
				try {
					const data = this.mapToPrismaData(article); // Map the DTO to the format expected by Prisma

					const existing = await prisma.rawArticle.findUnique({
						where: {
							link: data.link, // 'link' is unique for each article
						},
					});

					if (existing) {
						// Article already exists, skip saving
						console.log(
							`Article with link ${data.link} already exists, skipping.`,
						);
						return false; // Indicate success for this article (already exists)
					}

					// Create a new article since it doesn't exist
					await prisma.rawArticle.create({
						data,
					});

					return true; // Indicate success for this article
				} catch (error) {
					console.error("Error saving article:", error);
					return false; // Indicate failure for this article
				}
			}),
		);

		return {
			processed: result.length,
			success: result.filter((res) => res).length,
			failed: result.filter((res) => !res).length,
		};
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
