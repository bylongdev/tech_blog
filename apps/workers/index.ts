import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";
import { prisma } from "@techblog/database/src/client.js";

import { ConceptExtractingService } from "./services/concept-extracting.service.js";

// import { EmbeddingService } from "./services/embedding.service.js";

async function main() {
	/* 	await registerSources();
	await fetchSources(); */

	const inputList = await prisma.articleCandidate.findMany({
		take: 5,
		select: {
			id: true,
			embeddingText: true,
			cleanedTitle: true,
		},
	});

	const res = [];

	for (const input of inputList) {
		const content = input.embeddingText;

		const conceptExtractingService = new ConceptExtractingService(
			input.cleanedTitle,
		);
		const concept = await conceptExtractingService.extract(content);

		res.push(concept);
		// console.log("Result:", concept); // Log the extracted concepts
	}

	console.log("All Results:", Object.values(res)); // Log all extracted concepts
}

main()
	.catch((error) => {
		console.error("Error in worker:", error);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Worker finished.");
	});
