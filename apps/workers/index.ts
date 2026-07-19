import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";
import { queueListener } from "./queues/queue-listener.js";

const INTERVAL = 5 * 60 * 1000; // run every 5 minutes
await queueListener.start();

async function main() {
	// await fetchSources();
}

async function run() {
	try {
		await main();
	} catch (error) {
		console.error("Error in worker:", error);
	} finally {
		console.log("-".repeat(30));
		console.log("Worker cycle finished.");
		console.log("-".repeat(30));
	}

	setTimeout(run, INTERVAL);
}

run();
