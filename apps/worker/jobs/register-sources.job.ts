import { prisma } from "@techblog/database/src/client.js";
import { SOURCES } from "../fetchers/registers/source.registry.js";

async function registerSources() {
	await Promise.all(
		SOURCES.map(async (source) => {
			// Upsert the source based on its slug to avoid duplicates
			await prisma.source.upsert({
				where: { slug: source.slug },
				update: {
					name: source.name,
					url: source.url,
				},
				create: source,
			});

			// Log the registration of the source
			console.log(`Registered source: ${source.name}`);
		}),
	);
}

export { registerSources };
