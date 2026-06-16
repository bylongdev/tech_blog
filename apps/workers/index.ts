import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";
import { prisma } from "@techblog/database/src/client.js";
import { GroupingService } from "./services/article-grouping.service.js";

const vector = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]; // Example vector for testing

async function main() {
	// await registerSources();
	// await fetchSources();

	const groupingService = new GroupingService(
		"cmqgoy0ir000krcgds8v49yks",
		vector,
	);
	groupingService.findBestMatch();
}

main()
	.catch((error) => {
		console.error("Error in worker:", error);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Worker finished.");
	});
