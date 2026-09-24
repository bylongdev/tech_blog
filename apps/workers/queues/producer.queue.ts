import { Queue } from "bullmq";
import { redisConfig } from "./connection.js";

class QueueProducer {
	private readonly queue: Queue;

	constructor(name: string) {
		this.queue = new Queue(name, {
			connection: redisConfig,
			defaultJobOptions: {
				removeOnComplete: true,
				removeOnFail: true,
			},
		});
	}

	async add(jobName: string, data: any, jobId?: string) {
		return this.queue.add(jobName, data, jobId ? { jobId } : undefined);
	}

	// Returns the existing job for this id, if any (waiting/active/delayed jobs
	// are kept around; completed/failed ones are removed by defaultJobOptions,
	// so a missing job means it's safe - and necessary - to re-add it).
	async getJob(jobId: string) {
		return this.queue.getJob(jobId);
	}

	async close() {
		await this.queue.close();
	}
}

export { QueueProducer };
