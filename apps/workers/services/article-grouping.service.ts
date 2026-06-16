import { Prisma } from "@techblog/database/generated/prisma/client.js";
import { prisma } from "@techblog/database/src/client.js";
import { cosineSimilarity } from "../utils/cosine-similarity.js";

const GROUP_THRESHOLD = 0.9;
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
	public currentVector: number[];

	constructor(articleId: string, currentVector: number[]) {
		this.articleId = articleId;
		this.currentVector = currentVector;
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

	//
	async findBestMatch() {
		const candidate = await this.get_candidate();

		// Get all article groups with their candidates and embeddings
		const articleGroups = await prisma.articleGroup.findMany({
			include: {
				candidates: true,
			},
		});

		if (articleGroups.length === 0) {
			console.log("No article groups found.");

			await prisma.articleGroup.create({
				data: {
					centroid: this.currentVector,
					representativeArticles: {
						connect: { id: candidate.id },
					},
					candidates: {
						connect: { id: candidate.id },
					},
				},
			});

			console.log(
				`Created new group for article ${candidate.id} as the first member.`,
			);

			return;
		}

		console.log(articleGroups);

		return;
	}
}
