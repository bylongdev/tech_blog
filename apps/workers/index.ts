import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";
import { prisma } from "@techblog/database/src/client.js";

import { MetaDataExtractingAgent } from "./agents/extracting/meta-data-extracting.agent.js";
const agent = new MetaDataExtractingAgent();

const INTERVAL = 60 * 1000; // run every minute

async function main() {
	await registerSources();
	await fetchSources();
}

async function run() {
	try {
		await main();
	} catch (error) {
		console.error("Error in worker:", error);
	} finally {
		console.log("-".repeat(30));
		console.log("Worker cycle finished.\n");
		console.log("-".repeat(30));
	}

	setTimeout(run, INTERVAL);
}

run();
