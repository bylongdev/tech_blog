// fetchers/aws.source.ts
import type { SourceConfig } from "./registers/source.registry.js";

export const awsSource: SourceConfig = {
	slug: "aws",
	name: "AWS Blog",
	url: "https://aws.amazon.com/blogs/aws/feed/",
	fetchType: "RSS",
	enabled: true,
};
