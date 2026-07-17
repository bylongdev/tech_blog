import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export interface ArticleDetail {
	id: string;
	rawArticleId: string;
	cleanedTitle: string;
	category: string | null;
	subCategory: string | null;
	class: string | null;
	entities: string[];
	products: string[];
	event: string | null;
	summary: string | null;
	groupId: string | null;
	status: string;
	createdAt: string;
	updatedAt: string;
	rawArticle: {
		id: string;
		title: string;
		link: string;
		summary: string | null;
		content: string | null;
		author: string | null;
		publishedAt: string | null;
		fetchedAt: string;
		source: {
			name: string;
		};
	};
}

interface ArticleDetailResponse {
	article: ArticleDetail;
	message?: string;
}

export async function getArticle(id: string): Promise<ArticleDetail> {
	const cookieStore = await cookies();
	const response = await fetch(
		`${process.env.SERVER_API_URL}/api/v1/articles/${encodeURIComponent(id)}`,
		{
			headers: {
				Cookie: cookieStore.toString(),
			},
			cache: "no-store",
		},
	);

	if (response.status === 404) {
		notFound();
	}

	const data = (await response.json()) as ArticleDetailResponse;

	if (!response.ok) {
		throw new Error(data.message ?? "Failed to fetch article.");
	}

	return data.article;
}
