import { GroupingService } from "../services/grouping/article-grouping.service.js";

async function groupingJob(candidateId: string, vector: number[]) {
	console.log(
		`Processing grouping for candidateId: ${candidateId} with vector length: ${vector.length}`,
	);

	const groupingService = new GroupingService(candidateId);
	await groupingService.findBestMatch(); // Pass the embedding vector to the grouping service to find the best match and group articles accordingly

	console.log(`Completed grouping for candidateId: ${candidateId}`);
}

export { groupingJob };
