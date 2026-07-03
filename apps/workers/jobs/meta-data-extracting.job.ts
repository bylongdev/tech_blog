import { MetaDataExtractingService } from "../services/extracting/meta-data-extracting.service.js";

import type { MetadataArticleDTO } from "@techblog/shared";

class MetaDataExtractingJob extends MetaDataExtractingService {
	constructor() {
		super();
	}

	async extract(candidateId: string, input: string) {
		const result = await this.extractMetaData(input);

		const data: MetadataArticleDTO = JSON.parse(result);

		await this.updateCandidate(candidateId, data);

		await this.updateStatus(candidateId); // Update the candidate status to "EXTRACTED" after successful metadata extraction
	}
}

export const metaDataExtractingJob = new MetaDataExtractingJob();
