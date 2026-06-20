// fetchers/docker.source.ts
import type { SourceConfig } from "./registers/source.registry.js";

export const dockerSource: SourceConfig = {
	slug: "docker",
	name: "Docker Blog",
	url: "https://www.docker.com/feed/",
	fetchType: "RSS",
	enabled: true,
};
