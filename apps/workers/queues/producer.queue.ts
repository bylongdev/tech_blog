import { Queue } from "bullmq";
import { redisConfig } from "./connection.js";

class QueueProducer extends Queue {
	constructor(title?: string) {
		super(title || "unknown", {
			connection: redisConfig,
			defaultJobOptions: {
				removeOnComplete: true,
				removeOnFail: true,
			},
		});
	}

	getTitle() {
		return this.name;
	}

	async close() {
		await this.close();
	}
}

export { QueueProducer };
