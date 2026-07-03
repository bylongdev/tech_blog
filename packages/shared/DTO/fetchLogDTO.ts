export interface FetchLogDto {
	sourceId: string;
	status: "RUNNING" | "SUCCESS" | "FAILED";
	startedAt: Date;
	finishedAt?: Date;
	itemsFound?: number;
	itemsProcessed?: number;
	errorMessage?: string;
	createdAt: Date;
}
