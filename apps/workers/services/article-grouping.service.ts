import { Prisma } from "@techblog/database/generated/prisma/client.js";
import { prisma } from "@techblog/database/src/client.js";
import { cosineSimilarity } from "../utils/cosine-similarity.js";

const GROUP_THRESHOLD = 0.82;
const RECENT_DAYS = 7;

export class GroupingService {
	public articleId: string;

	constructor(articleId: string) {
		this.articleId = articleId;
	}

	/* HELPER */
	private async get_candidate() {
		// Fetch the candidate from the database using Prisma
		const candidate = await prisma.articleCandidate.findFirst({
			where: {
				id: this.articleId,
			},
			select: {
				id: true,
				embedding: true,
			},
		});

		if (!candidate) {
			throw new Error(`Candidate with ID ${this.articleId} not found`);
		}

		return candidate;
	}

	/* Main */
	// KNN style grouping: For each new article, find the most similar existing group and update that group with the new article's vector
	async findBestMatch() {
		const candidate = await this.get_candidate();

		// Fetch all candidates that are not the current article and have an embedding
		const candidates = await prisma.articleCandidate.findMany({
			where: {
				status: "GROUPED", // Only consider already grouped articles for matching
				createdAt: {
					gte: new Date(Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000), // Only consider articles created within the last RECENT_DAYS days
				},
			},
			select: {
				id: true,
				embedding: true,
				groupId: true,
			},
		});

		// Initialize variables to keep track of the best match and its score
		let bestMatch: (typeof candidates)[number] | null = null;
		let bestScore = -1;

		for (const c of candidates) {
			if (c.id === this.articleId) continue;
			if (!c.embedding) continue;

			const embedding = c.embedding as number[];

			// Skip if either embedding is empty or if they have different dimensions
			if (
				!embedding.length ||
				!candidate.embedding ||
				!(candidate.embedding as number[]).length
			)
				continue;

			// Ensure both embeddings have the same length before calculating cosine similarity
			if (embedding.length !== (candidate.embedding as number[]).length)
				continue;

			const score = cosineSimilarity(
				candidate.embedding as number[],
				embedding,
			);
			if (score > bestScore) {
				bestScore = score;
				bestMatch = c;
			}
		}

		/* 
			Logic for grouping:
			- If no good match is found (bestScore < GROUP_THRESHOLD), create a new group for this article.
			- If a good match is found and it belongs to an existing group, add this article to that group.
			- If a good match is found but it doesn't belong to a group, create a new group and add both the current article and the best match to that group.


			Threshold tuning:
			- A higher threshold (e.g., 0.85) means that only very similar articles will be grouped together, resulting in more groups with fewer articles in each.
			- A lower threshold (e.g., 0.75) means that less similar articles can be grouped together, resulting in fewer groups with more articles in each.

		*/

		await prisma.$transaction(async (tx) => {
			// If no good match is found, create a new group for this article
			if (!bestMatch || bestScore < GROUP_THRESHOLD) {
				console.log(
					`No good match found for article ${this.articleId}. Creating new group.`,
				);
				// Log the best score and the best match ID (if any) for debugging purposes
				console.log(
					`Best match score: ${bestScore} (best match: ${
						bestMatch ? bestMatch.id : "None"
					})`,
				);
				// Create a new group for this article
				const newGroup = await tx.articleGroup.create({
					data: {},
				});

				// Update the candidate's groupId to the new groupId
				await tx.articleCandidate.update({
					where: { id: this.articleId },
					data: {
						groupId: newGroup.id,
						status: "GROUPED",
					},
				});
			} else {
				// If a good match is found, group the current article with the best match's group
				if (bestMatch.groupId) {
					// Update the candidate's groupId to match the best match's groupId
					await tx.articleCandidate.update({
						where: { id: this.articleId },
						data: {
							groupId: bestMatch.groupId,
							status: "GROUPED",
						},
					});

					console.log(
						`Grouped article ${this.articleId} with existing group ${bestMatch.groupId} (best match: ${bestMatch.id}, score: ${bestScore})`,
					);
				} else {
					// If the best match doesn't have a groupId, create a new group and assign both articles to that group

					// Create a new group
					const newGroup = await tx.articleGroup.create({
						data: {},
					});

					// Update both the current article and the best match to belong to the new group
					await tx.articleCandidate.updateMany({
						where: {
							id: {
								in: [this.articleId, bestMatch.id],
							},
						},
						data: {
							groupId: newGroup.id,
							status: "GROUPED",
						},
					});
					console.log(
						`Grouped article ${this.articleId} with new group ${newGroup.id} (best match: ${bestMatch.id}, score: ${bestScore})`,
					);
				}
			}
		});

		return;
	}
}
