// fetchers/source.registry.ts
import { awsSource } from "../sources/aws.source.js";
import { openaiSource } from "../sources/openai.source.js";
import { githubSource } from "../sources/github.source.js";

export type SourceConfig = {
	slug: string;
	name: string;
	url: string;
	fetchType: "RSS" | "API" | "HTML";
};

export const SOURCES: SourceConfig[] = [awsSource, openaiSource, githubSource];
