import { MetaDataExtractingAgent } from "../../agents/extracting/meta-data-extracting.agent.js";
import { prisma } from "@techblog/database/src/client.js";
import type { MetadataArticleDTO } from "@techblog/shared";

class MetaDataExtractingService extends MetaDataExtractingAgent {
	constructor() {
		super();
	}

	async updateCandidate(candidateId: string, data: MetadataArticleDTO) {
		if (!data) {
			throw new Error("No data provided for candidate update.");
		}

		// Update the candidate in the database using Prisma

		if (!data) {
			throw new Error("No data provided for candidate update.");
		}

		console.log(
			`Updating candidate ${candidateId} with data: ${JSON.stringify(data, null, 2)}`,
		);

		// Update the candidate in the database using Prisma
		await prisma.articleCandidate.update({
			where: { id: candidateId },
			data: {
				category: data.category || null,
				subCategory: data.subCategory || null,
				class: data.class || null,
				entities: data.entities || [],
				products: data.products || [],
				event: data.event || null,
				summary: data.summary || null,
			},
		});

		console.log(`Candidate ${candidateId} updated successfully.`);
	}

	async updateStatus(candidateId: string) {
		if (!candidateId) {
			throw new Error("Candidate ID is required to update status.");
		}

		console.log(`Updating status for candidate ${candidateId} to "EXTRACTED".`);

		// Update the candidate status to "EXTRACTED" after successful metadata extraction
		await prisma.articleCandidate.update({
			where: { id: candidateId },
			data: { status: "EXTRACTED" },
		});

		console.log(`Candidate ${candidateId} status updated to "EXTRACTED".`);
	}
}

export { MetaDataExtractingService };
