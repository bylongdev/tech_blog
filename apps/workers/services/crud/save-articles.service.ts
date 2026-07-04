import { prisma } from "@techblog/database/src/client.js";
import type {
	CandidateArticleDTO,
	CreateRawArticleDto,
} from "@techblog/shared";
import { ContentService } from "../../utils/helpers/clean-text.helper.js";
import { QueueProducer } from "../../queues/producer.queue.js";

export class RawArticleService {
	// CRUD operations for RawArticle
	async bulkSave(articles: CreateRawArticleDto[]) {
		const result = await Promise.all(
			articles.map(async (article) => {
				try {
					const rawArticle = await this.saveRawArticle(article);

					if (!rawArticle) {
						return false; // Indicate success for this article (already exists)
					}

					console.log(`Saved raw article with ID: ${rawArticle.id}`);

					const candidate = await this.saveCandidateArticle(
						this.mapToCandidateData(rawArticle),
					);

					console.log(
						`Saved candidate article with ID: ${candidate.id} for raw article ID: ${rawArticle.id}`,
					);

					const queueProducer = new QueueProducer("extracting");
					await queueProducer.add("meta_extracting", {
						rawArticleId: candidate.id,
						content: rawArticle.content || "",
					});
					await queueProducer.close(); // Close the producer after adding the job

					console.log(`Queued candidate for metadata extraction`);

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

	async saveRawArticle(article: CreateRawArticleDto) {
		const data = this.mapToPrismaData(article);

		const existing = await prisma.rawArticle.findUnique({
			where: {
				link: data.link,
			},
		});

		if (existing) {
			console.log(`Article with link ${data.link} already exists, skipping.`);
			return null;
		}

		const newArticle = await prisma.rawArticle.create({
			data,
		});

		if (!newArticle) {
			throw new Error(`Failed to create article for link: ${data.link}`);
		}

		return newArticle;
	}

	async saveCandidateArticle(article: CandidateArticleDTO) {
		if (!article.rawArticleId) {
			throw new Error(
				"rawArticleId is required to create an article candidate.",
			);
		}

		if (!article.cleanedTitle) {
			throw new Error(
				"cleanedTitle is required to create an article candidate.",
			);
		}

		if (!article.embeddingText) {
			throw new Error(
				"embeddingText is required to create an article candidate.",
			);
		}

		return prisma.articleCandidate.create({
			data: {
				rawArticleId: article.rawArticleId,
				cleanedTitle: article.cleanedTitle,
				embeddingText: article.embeddingText,
				status: "QUEUED",
			},
		});
	}

	// Helper method to map CreateRawArticleDto to the format expected by Prisma
	private mapToPrismaData(article: CreateRawArticleDto) {
		return {
			sourceId: article.sourceId,
			title: article.title,
			link: article.link,
			guid: article.guid,
			content: article.content ?? null,
			summary: article.summary ?? null,
			rawHtml: article.rawHtml ?? null,
			author: article.author ?? null,
			imageUrl: article.imageUrl ?? [],
			publishedAt: article.publishedAt ?? null,
			fetchedAt: article.fetchedAt,
		};
	}

	private mapToCandidateData(article: {
		id: string;
		title: string;
		content: string | null;
	}): CandidateArticleDTO {
		const contentService = new ContentService();
		const cleanedTitle = contentService.clean(article.title);
		const cleanedContent = contentService.clean(article.content || "");
		const embeddingText = [cleanedTitle, cleanedContent.slice(0, 800)]
			.filter(Boolean)
			.join("\n");

		return {
			rawArticleId: article.id,
			cleanedTitle,
			embeddingText,
		};
	}
}
