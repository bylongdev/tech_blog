// scripts/register-sources.ts
import { prisma } from "@techblog/database/src/client.js";
import { SOURCES } from "./source.registry.js";

async function main() {
	// Upsert each source into the database
	for (const source of SOURCES) {
		// Upsert the source based on its URL to avoid duplicates
		await prisma.source.upsert({
			where: { url: source.url },
			update: {
				name: source.name,
				url: source.url,
			},
			create: source,
		});

		// Log the registration of the source
		console.log(`Registered source: ${source.name}`);
	}
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
