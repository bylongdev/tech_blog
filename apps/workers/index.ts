import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";
import { prisma } from "@techblog/database/src/client.js";

import { metaDataExtractingJob } from "./jobs/meta-data-extracting.job.js";

import { MetaDataExtractingAgent } from "./agents/extracting/meta-data-extracting.agent.js";
const agent = new MetaDataExtractingAgent();

async function main() {
	await registerSources();
	await fetchSources();
}

main()
	.catch((error) => {
		console.error("Error in worker:", error);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Worker finished.");
	});
