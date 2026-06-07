/* 
model Source {
  id                   String       @id @default(cuid())
  name                 String
  url                  String?      @unique
  slug                 String       @unique
  fetchType            FetchType
  parserType           String       @default("default")
  fetchConfig          Json?
  category             String?
  enabled              Boolean      @default(true)
  fetchIntervalMinutes Int          @default(30)
  lastFetchedAt        DateTime?
  lastSuccessAt        DateTime?
  lastFailedAt         DateTime?
  failureCount         Int          @default(0)
  lastError            String?
  createdAt            DateTime     @default(now())
  updatedAt            DateTime     @updatedAt
  fetchLogs            FetchLog[]
  articles             RawArticle[]
}
*/

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
