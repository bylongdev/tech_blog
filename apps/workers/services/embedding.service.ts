export class EmbeddingService {
	async createEmbedding(text: string): Promise<number[]> {
		// mock trước để test flow DB
		return Array.from({ length: 10 }, () => Math.random());
	}
}
