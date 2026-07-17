import { prisma } from "@techblog/database/src/client.js";

export class ArticleService {
	async listArticles() {
		return await prisma.articleCandidate.findMany({
			orderBy: {
				createdAt: "desc",
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
				status: true,
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

	async getArticleById(id: string) {
		return await prisma.articleCandidate.findUnique({
			where: { id },
			select: {
				id: true,
				rawArticleId: true,
				category: true,
				subCategory: true,
				class: true,
				entities: true,
				products: true,
				event: true,
				summary: true,
				cleanedTitle: true,
				groupId: true,
				status: true,
				createdAt: true,
				updatedAt: true,
				rawArticle: {
					select: {
						id: true,
						title: true,
						link: true,
						summary: true,
						content: true,
						author: true,
						publishedAt: true,
						fetchedAt: true,
						source: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});
	}
}
