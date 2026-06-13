export function cosineSimilarity(a: number[], b: number[]): number {
	if (a.length !== b.length) {
		throw new Error("Vectors must have the same length");
	}

	let dot = 0;
	let magA = 0;
	let magB = 0;

	for (let i = 0; i < a.length; i++) {
		const av = a[i]!;
		const bv = b[i]!;

		dot += av * bv;
		magA += av * av;
		magB += bv * bv;
	}

	if (magA === 0 || magB === 0) {
		return 0;
	}

	return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
