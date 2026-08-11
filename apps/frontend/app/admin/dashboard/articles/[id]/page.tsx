import {
	ArticleHeader,
	MetadataCard,
	ProcessingCard,
	RawDataAccordion,
	SourceCard,
	SummaryCard,
} from "./article-details";
import { getArticle } from "./get-article";

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	console.log("ArticlePage params:", id);
	const article = await getArticle(id);

	if (!article) {
		return (
			<div className="flex flex-1 justify-center items-center h-full">
				<p className="text-lg font-medium text-muted-foreground">
					Article not found
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
			<ArticleHeader article={article} />
			<SummaryCard article={article} />
			<div className="grid gap-6 lg:grid-cols-2">
				<MetadataCard article={article} />
				<SourceCard article={article} />
			</div>
			<ProcessingCard article={article} />
			<RawDataAccordion article={article} />
		</div>
	);
}
