import { Worker } from "bullmq";
import { redisConfig } from "../connection.js";
import { metaDataExtractingJob } from "../../jobs/meta-data-extracting.job.js";

new Worker(
	"extracting ",
	async (job) => {
		switch (job.name) {
			case "meta_extracting":
				metaDataExtractingJob.extractMetaData(job.data.content);
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

console.log("Starting extracting listener...");
