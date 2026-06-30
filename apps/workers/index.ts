import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";
import { prisma } from "@techblog/database/src/client.js";

import { openAIClient as agent } from "./agents/lib/openai/openai.client.js";

import Parser from "rss-parser";
const parser = new Parser();

async function main() {
	// await registerSources();
	// await fetchSources();

	const result = await agent.articleCategorising(
		"What is an SBOM (and Why Can’t You Ship Without One)?In Omdia’s 2026 software supply chain security report, 73% of organizations that generate SBOMs say they enable more efficient vulnerability mitigation, yet 86% still find the generation process challenging. That gap between recognized value and operational difficulty is where most teams are stuck. For teams building and securing containerized applications, understanding what an SBOM is, and how to make it useful, is no longer optional. This guide covers what SBOMs contain, why they matter for software supply chain security, how standard formats and tooling work, and where the industry is headed with regulations and enforcement. An SBOM is a machine-readable inventory of every component inside a software artifact. SBOMs gain real value when paired with provenance attestations and cryptogra",
	);

	console.log("Article categorising result:", result);
}

main()
	.catch((error) => {
		console.error("Error in worker:", error);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Worker finished.");
	});
