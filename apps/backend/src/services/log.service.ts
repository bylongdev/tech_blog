import { prisma } from "@techblog/database/src/client.js";

export class LogService {
	async getLogs() {
		const logs = await prisma.fetchLog.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
		return logs;
	}
}
