export class ContentService {
	clean(title: string): string {
		return (
			title
				// Decode basic html entities
				.replace(/&amp;/g, "&")
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g, "'")
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")

				// Remove new lines
				.replace(/[\r\n\t]/g, " ")

				// Collapse multiple spaces
				.replace(/\s+/g, " ")

				.trim()
		);
	}
}
