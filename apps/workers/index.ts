import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";
import { embeddingJob } from "./jobs/embedding.job.js";
import { prisma } from "@techblog/database/src/client.js";
import { redis } from "./queues/connection.js";

async function main() {
	// await registerSources();
	// await fetchSources();
	/* 
	await embeddingJob("cmq3acgpp000644gdmuhv9805");
	await embeddingJob("cmq3acgpp000744gd0d27lm52");
	await embeddingJob("cmq3acgpp000844gdxbrlv5dm"); */

	console.log(await redis.ping());
}

main()
	.catch((error) => {
		console.error("Error in worker:", error);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Worker finished.");
	});
