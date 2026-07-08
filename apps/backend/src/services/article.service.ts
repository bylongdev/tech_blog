import { prisma } from "@techblog/database/src/client.js";

export class ArticleService {
	async listArticles() {
		return await prisma.articleCandidate.findMany({
			orderBy: {
				createdAt: "asc",
			},
			select: {
				id: true,
				category: true,
				subCategory: true,
				class: true,
				entities: true,
				products: true,
				event: true,
				summary: true,
				createdAt: true,
				rawArticle: {
					select: {
						id: true,
						link: true,
						author: true,
						createdAt: true,
					},
				},
			},
		});
	}
}
