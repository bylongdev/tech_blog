import { prisma } from "@techblog/database/src/client.js";
import type { RawArticleDTO } from "@techblog/shared";

export class RawArticleService {
	async saveMany(articles: RawArticleDTO[]) {
		for (const article of articles) {
			await prisma.rawArticle.upsert({
				where: {
					link: article.link,
				},
				update: {},
				create: {
					sourceId: "techcrunch",
					title: article.title,
					link: article.link,
					content: article.content ?? null,
					author: article.author ?? null,
					publishedAt: article.publishedAt ?? null,
					fetchedAt: article.fetchedAt,
				},
			});
		}
	}
}
