import { Worker } from "bullmq";
import { redisConfig } from "../connection.js";

import { ContentService } from "../../services/clean-text.service.js";
import { QueueProducer } from "../producer.queue.js";

import { prisma } from "@techblog/database/src/client.js";

new Worker(
	"embedding",
	async (job) => {
		switch (job.name) {
			case "register_candidate":
				await registerCandidate(job);
				break;
			case "create_embedding":
				// Handle the create_embedding job here
				console.log("Received create_embedding job:", job.data);
				// You can implement the logic to create embeddings for the article candidate here
				break;

			default:
				console.warn(`Unknown job name: ${job.name}`);
				break;
		}
	},
	{
		connection: redisConfig,
	},
);

console.log("Starting embedding listener...");

// Separate function to handle the register_candidate job
async function registerCandidate(job: any) {
	try {
		const rawArticleId = job.data.rawArticleId;

		// Clean the title and content using the ContentService
		const contentService = new ContentService();
		const cleanedTitle = contentService.clean(job.data.title);
		const cleanedContent = contentService.clean(job.data.content || "");

		// Create a new ArticleCandidate for embedding and grouping
		const candidate = await prisma.articleCandidate.create({
			data: {
				rawArticleId: rawArticleId,
				cleanedTitle: cleanedTitle, // You can replace this with the cleaned title if you have a TitleService
				embeddingText: cleanedTitle + " " + cleanedContent, // You can replace this with the cleaned title if you have a TitleService
				status: "QUEUED",
			},
		});

		// Add the article to the embedding queue
		const queueProducer = new QueueProducer("embedding");
		await queueProducer.add("create_embedding", {
			articleCandidateId: candidate.id,
		});
		await queueProducer.close(); // Close the producer after adding the job

		console.log(`Article with raw ID ${rawArticleId} is queued for embedding.`);
	} catch (error) {
		console.error("Error processing register_candidate job:", error);
	}
}

async function embedding() {}
