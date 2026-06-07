import { prisma } from "@techblog/database/src/client.js";
import type { FetchLogDto } from "../../../packages/shared/fetchLogDTO.js";

export class FetchLogService {
	async start(sourceId: string) {
		// Create a new fetch log entry with status "RUNNING"
		const fetchLogData: FetchLogDto = {
			sourceId,
			status: "RUNNING",
			startedAt: new Date(),
			createdAt: new Date(),
		};

		return prisma.fetchLog.create({
			data: fetchLogData,
		});
	}

	// Update the fetch log entry to "SUCCESS" with items found and processed counts
	async success(
		fetchLogId: string,
		data: { itemsFound: number; itemsProcessed: number },
	) {
		return prisma.fetchLog.update({
			where: { id: fetchLogId },
			data: {
				status: "SUCCESS",
				finishedAt: new Date(),
				itemsFound: data.itemsFound,
				itemsProcessed: data.itemsProcessed,
			},
		});
	}

	// Update the fetch log entry to "FAILED" with an error message
	async failed(fetchLogId: string, error: unknown) {
		return prisma.fetchLog.update({
			where: { id: fetchLogId },
			data: {
				status: "FAILED",
				finishedAt: new Date(),
				errorMessage: typeof error === "string" ? error : JSON.stringify(error),
			},
		});
	}
}
