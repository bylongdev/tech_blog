import { prisma } from "@techblog/database/src/client.js";

export class UserService {
	async listUsers() {
		return prisma.user.findMany({
			orderBy: {
				createdAt: "asc",
			},
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				isActive: true,
				createdAt: true,
			},
		});
	}

	async getUserById(id: string) {
		return prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				isActive: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}
}
