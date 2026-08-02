import { prisma } from "@techblog/database/src/client.js";

export class OverviewService {
	async getOverview() {
		const [sources, articles, processedArticles, members] = await Promise.all([
			prisma.source.count(),
			prisma.rawArticle.count(),
			prisma.articleCandidate.count({ where: { status: "EXTRACTED" } }),
			prisma.user.count(),
		]);
		return {
			totals: {
				sources,
				articles,
				processedArticles,
				members,
			},
		};
	}
}
