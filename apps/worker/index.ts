import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";

async function main() {
	await registerSources();
	await fetchSources();
}

main().catch((error) => {
	console.error("Error in worker:", error);
});
