import { Worker } from "bullmq";
import { redisConfig } from "../connection.js";

new Worker(
	"embedding",
	async (job) => {
		console.log(job.data);
	},
	{
		connection: redisConfig,
	},
);

console.log("Starting embedding listener...");
