export function cosineSimilarity(a: number[], b: number[]): number {
	if (a.length !== b.length) {
		throw new Error("Vectors must have the same length");
	}

	// Calculate dot product and magnitudes
	const dot = a.reduce((sum, value, index) => sum + value * (b[index] ?? 0), 0);
	const magA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
	const magB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));

	// Handle edge case where magnitude is zero
	if (magA === 0 || magB === 0) return 0;

	return dot / (magA * magB);
}
