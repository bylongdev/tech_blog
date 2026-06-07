import { Prisma } from "@techblog/database/generated/prisma/client.js";
import { prisma } from "@techblog/database/src/client.js";
import { cosineSimilarity } from "../utils/cosine-similarity.js";

const GROUP_THRESHOLD = 0.9;

export class GroupingService {
	// Find the best match for the current article based on embedding similarity
	async findBestMatch(articleId: string, currentVector: number[]) {
		const candidates = await prisma.articleCandidate.findMany({
			where: {
				status: "GROUPED",
				groupId: {
					not: null,
				},
				embedding: {
					not: Prisma.JsonNull,
				},
				createdAt: {
					gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
				}, // Only consider candidates created in the last 7 days
			},
		});

		if (!candidates || candidates.length === 0) {
			// No candidates available, create a new group for this article
			const group = await prisma.$transaction(async (tx) => {
				// Create new group
				const newGroup = await tx.articleGroup.create({
					data: {},
				});

				// Update candidate with new group ID and status
				await tx.articleCandidate.update({
					where: { id: articleId },
					data: {
						groupId: newGroup.id,
						status: "GROUPED",
					},
				});

				return newGroup;
			});

			// Return action indicating a new group was created
			return {
				action: "CREATED_GROUP",
				groupId: group.id,
				score: 1,
			};
		}

		// Calculate cosine similarity between current vector and candidate vectors
		const similarities = candidates.map((candidate) => {
			return cosineSimilarity(currentVector, candidate.embedding as number[]);
		});

		// Find the candidate with the highest similarity
		const maxSimilarity = Math.max(...similarities);

		// If the highest similarity is below the threshold, create a new group
		if (maxSimilarity < GROUP_THRESHOLD) {
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
				score: maxSimilarity,
			};
		}
	}
}
