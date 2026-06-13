import { registerSources } from "./jobs/register-sources.job.js";
import { fetchSources } from "./jobs/fetch-sources.job.js";
import { prisma } from "@techblog/database/src/client.js";

import { ollamaClient } from "./agents/lib/ollama/ollama.client.js";

import { EmbeddingService } from "./services/embedding.service.js";

async function main() {
	/* await registerSources();
	await fetchSources(); */

	/* const titles = [
		"Introducing the next generation of Amazon OpenSearch Serverless for building agentic AI applications",
		"Introducing the next generation of AWS Resilience Hub",
		"GitHub Copilot app: The agent-native desktop experience",
		"Give GitHub Copilot CLI real code intelligence with language servers",
		"Still a developer. Just outside. Our latest GitHub Shop collection is here.",
		"From one-off prompts to workflows: How to use custom agents in GitHub Copilot CLI",
	]; */

	const titles = [
		"From one-off prompts to workflows: How to use custom agents in GitHub Copilot CLI Developers work across many surfaces like the CLI, IDE, and GitHub. The terminal is often where they turn to move fast, automate tasks, or work directly with systems and scripts. Tools like the GitHub Copilot CLI already make this easier. You can generate commands, debug issues, and move quicker with",
	];

	for (const title of titles) {
		const canicalTitle = await ollamaClient.canonicalTitleExtracting(title);

		console.log("Result:", canicalTitle.response);
	}
}

main()
	.catch((error) => {
		console.error("Error in worker:", error);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Worker finished.");
	});
