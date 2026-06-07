// fetchers/source.registry.ts
import { awsSource } from "../aws.source.js";
import { openaiSource } from "../openai.source.js";
import { githubSource } from "../github.source.js";
import { techcrunchSource } from "../techcrunch.source.js";
import { anthropicSource } from "../anthropic.source.js";

export type SourceConfig = {
	slug: string;
	name: string;
	url: string;
	fetchType: "RSS" | "API" | "HTML";
	enabled?: boolean;
};

export const SOURCES: SourceConfig[] = [
	awsSource,
	openaiSource,
	githubSource,
	techcrunchSource,
	anthropicSource,
];
