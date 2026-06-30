import { Worker } from "bullmq";
import { redisConfig } from "../connection.js";

import { embeddingJob } from "../../jobs/embedding.job.js";
import { groupingJob } from "../../jobs/group-article.job.js";
import { registerCandidateJob } from "../../jobs/register-candidate.job.js";

new Worker(
	"embedding",
	async (job) => {
		switch (job.name) {
			case "register_candidate":
				await registerCandidateJob(job);
				break;
			case "create_embedding":
				await embeddingJob(job.data.articleCandidateId);
				break;
			case "find_best_match":
				await groupingJob(job.data.candidateId, job.data.vector);
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
