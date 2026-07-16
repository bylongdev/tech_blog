import { Article, columns } from "./columns";
import { DataTable } from "./data-table";
import { cookies } from "next/headers";

async function getData(): Promise<Article[]> {
	const cookieStore = await cookies();
	const res = await fetch("http://localhost:4000/api/v1/articles", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Cookie: cookieStore.toString(),
		},
	});
	const data = await res.json();

	const articles = data.articles.map(
		(article: {
			id: string;
			rawArticle: {
				id: string;
			};
			category?: string;
			subCategory?: string;
			class?: string;
			status: string;
			createdAt: string;
		}) => ({
			id: article.id,
			rawArticleId: article.rawArticle.id,
			category: article.category,
			subCategory: article.subCategory,
			class: article.class,
			status: article.status,
			createdAt: new Date(article.createdAt).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			}),
		}),
	);

	return articles;
}

export default async function ArticlesTable() {
	const data = await getData();

	return (
		<div className="w-full h-full">
			<DataTable
				columns={columns}
				data={data}
			/>
		</div>
	);
}
