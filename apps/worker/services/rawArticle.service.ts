import { prisma } from "@techblog/database/src/client.js";
import type { CreateRawArticleDto } from "@techblog/shared";

export class RawArticleService {
	async saveMany(articles: CreateRawArticleDto[]) {
		for (const article of articles) {
			const data = {
				sourceId: article.sourceId,
				title: article.title,
				link: article.link,
				guid: article.guid,
				content: article.content ?? null,
				author: article.author ?? null,
				publishedAt: article.publishedAt ?? null,
				fetchedAt: article.fetchedAt,
			};

			await prisma.rawArticle.upsert({
				where: {
					link: article.link,
				},
				update: { ...data },
				create: {
					...data,
				},
			});
		}
	}
}
