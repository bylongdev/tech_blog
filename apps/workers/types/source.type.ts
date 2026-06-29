export type Source = {
	id: string;
	name: string;
	url?: string;
	slug: string;
	fetchType: "RSS" | "API" | "HTML";
	parserType: string;
	fetchConfig?: Record<string, any>;
	category?: string;
	enabled: boolean;
	fetchIntervalMinutes: number;
	lastFetchedAt?: Date;
	lastSuccessAt?: Date;
	lastFailedAt?: Date;
	failureCount: number;
	lastError?: string;
	createdAt: Date;
	updatedAt: Date;
};
