import { Prisma } from "@techblog/database/generated/prisma/client.js";
import { prisma } from "@techblog/database/src/client.js";
import { cosineSimilarity } from "../utils/cosine-similarity.js";

const GROUP_THRESHOLD = 0.86;
const RECENT_DAYS = 7;

export class GroupingService {
	// Find the best match for the current article based on embedding similarity
	/* async findBestMatch(articleId: string, currentVector: number[]) {
		const recentDate = new Date(Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000);

		const candidates = await prisma.articleCandidate.findMany({
			where: {
				id: {
					not: articleId,
				},
				status: "GROUPED",
				groupId: {
					not: null,
				},
				embedding: {
					not: Prisma.JsonNull,
				},
				createdAt: {
					gte: recentDate,
				},
			},
		});

		let bestMatch: (typeof candidates)[number] | null = null; // TypeScript infers the type of bestMatch based on the candidates array
		let bestScore = -1;

		// Iterate through candidates to find the one with the highest cosine similarity
		for (const candidate of candidates) {
			const embedding = candidate.embedding as number[];

			if (!Array.isArray(embedding)) continue;
			if (embedding.length !== currentVector.length) continue;

			const score = cosineSimilarity(currentVector, embedding);

			if (score > bestScore) {
				bestScore = score;
				bestMatch = candidate;
			}
		}

		// If no good match is found, create a new group for this article
		if (!bestMatch || bestScore < GROUP_THRESHOLD) {
			console.log(
				`No good match found for article ${articleId}. Creating new group.`,
			);

			const group = await prisma.$transaction(async (tx) => {
				const newGroup = await tx.articleGroup.create({
					data: {},
				});

				await tx.articleCandidate.update({
					where: { id: articleId },
					data: {
						groupId: newGroup.id,
						status: "GROUPED",
					},
				});

				return newGroup;
			});

			return {
				action: "CREATED_GROUP",
				groupId: group.id,
				score: bestScore === -1 ? null : bestScore,
			};
		}

		console.log(
			`Best match for article ${articleId}:`,
			bestMatch.id,
			"with score:",
			bestScore,
		);

		// If a good match is found, group the current article with the best match's group
		await prisma.articleCandidate.update({
			where: { id: articleId },
			data: {
				groupId: bestMatch.groupId,
				status: "GROUPED",
			},
		});

		return {
			action: "GROUPED_WITH_EXISTING",
			groupId: bestMatch.groupId,
			score: bestScore,
			matchedCandidateId: bestMatch.id,
		};
	} */

	public articleId: string;

	constructor(articleId: string) {
		this.articleId = articleId;
	}

	private async get_candidate() {
		// Fetch the candidate from the database using Prisma
		const candidate = await prisma.articleCandidate.findFirst({
			where: {
				id: this.articleId,
			},
		});

		if (!candidate) {
			throw new Error(`Candidate with ID ${this.articleId} not found`);
		}

		return candidate;
	}

	updateCentroid(
		centroid: number[] | undefined,
		size: number,
		vector: number[],
	): number[] {
		if (!centroid) {
			return vector;
		}
		return centroid.map((v, i) =>
			vector[i] ? (v * size + vector[i]) / (size + 1) : v,
		);
	}

	// KNN style grouping: For each new article, find the most similar existing group and update that group with the new article's vector
	async findBestMatch() {
		const candidate = await this.get_candidate();

		// Fetch all candidates that are not the current article and have an embedding
		const candidates = await prisma.articleCandidate.findMany({
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

		await prisma.$transaction(async (tx) => {
			if (!bestMatch || bestScore < GROUP_THRESHOLD) {
				console.log(
					`No good match found for article ${this.articleId}. Creating new group.`,
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
