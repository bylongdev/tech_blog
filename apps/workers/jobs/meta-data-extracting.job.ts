import { MetaDataExtractingService } from "../services/extracting/meta-data-extracting.service.js";

import type { MetadataArticleDTO } from "@techblog/shared";

class MetaDataExtractingJob extends MetaDataExtractingService {
	constructor() {
		super();
	}

	async extract(candidateId: string, input: string) {
		console.log(
			`Starting metadata extraction for candidate ID: ${candidateId}`,
		);
		const data = await this.extractMetaData(input);

		await this.updateCandidate(candidateId, data);

		await this.updateStatus(candidateId); // Update the candidate status to "EXTRACTED" after successful metadata extraction

		console.log(
			`Metadata extraction completed for candidate ID: ${candidateId}\n`,
		);
	}
}

export const metaDataExtractingJob = new MetaDataExtractingJob();
