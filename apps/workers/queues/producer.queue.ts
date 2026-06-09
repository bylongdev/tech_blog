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

	async add(jobName: string, data: unknown) {
		return this.queue.add(jobName, data);
	}

	async close() {
		await this.queue.close();
	}
}

export { QueueProducer };
