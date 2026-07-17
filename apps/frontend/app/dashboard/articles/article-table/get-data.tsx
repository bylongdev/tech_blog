"use server";

import { cookies } from "next/headers";
import { Article } from "./columns";

interface ArticleCandidateResponse {
	articles: Array<{
		id: string;
		rawArticle: {
			id: string;
		};
		category?: string;
		subCategory?: string;
		class?: string;
		status: string;
		createdAt: string;
	}>;
}

export async function getData(): Promise<Article[]> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${process.env.SERVER_API_URL}/api/v1/articles`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
		});

		const data: ArticleCandidateResponse & { message?: string } =
			await res.json();

		if (!res.ok) {
			throw new Error(data?.message ?? "Failed to fetch articles");
		}

		const articles: Article[] = data.articles.map((article) => ({
			id: article.id,
			rawArticleId: article.rawArticle.id,
			category: article.category ?? "-",
			subCategory: article.subCategory ?? "-",
			class: article.class ?? "-",
			status: article.status,
			createdAt: new Date(article.createdAt).toLocaleDateString("en-AU", {
				year: "numeric",
				month: "short",
				day: "numeric",
			}),
		}));
		return articles;
	} catch (error) {
		console.error("Error fetching articles:", error);
		return [];
	}
}
