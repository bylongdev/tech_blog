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

	async countArticlesByMonth() {
		return await prisma.$queryRaw<
			{ month: string; raw: number; processed: number }[]
		>`
			SELECT 
				DATE_TRUNC('month', "publishedAt") AS month, 
				COUNT(DISTINCT ra.id)::int AS raw,
				COUNT(DISTINCT ac.id)::int AS processed
			FROM "RawArticle" as ra, "ArticleCandidate" as ac
			GROUP BY month
			ORDER BY month ASC;
		`;
	}

	async deleteArticleById(id: string) {
		return await prisma.articleCandidate.delete({
			where: { id },
		});
	}
}

export class ArticleServiceV2 {
	async listArticles(query: Record<string, any>) {
		const skip = 0 || Number(query.skip);
		return await prisma.articleCandidate.findMany({
			orderBy: {
				createdAt: "desc",
			},
			select: {
				id: true,
				cleanedTitle: true,
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
						content: true,
						author: true,
						link: true,
						imageUrl: true,
						publishedAt: true,
						source: {
							select: {
								name: true,
							},
						},
					},
				},
			},
			skip: skip,
			take: 10,
		});
	}
}
