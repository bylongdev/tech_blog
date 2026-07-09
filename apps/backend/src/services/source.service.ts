import { prisma } from "@techblog/database/src/client.js";

export class SourceService {
	async listSources() {
		return await prisma.source.findMany({
			select: {
				id: true,
				name: true,
				url: true,
				slug: true,
				enabled: true,
			},
		});
	}
}
