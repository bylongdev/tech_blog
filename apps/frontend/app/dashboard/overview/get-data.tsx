"use server";

import { cookies } from "next/headers";

interface OverviewDataResponse {
	totals: {
		sources: number;
		articles: number;
		processedArticles: number;
		members: number;
	};
}

export async function getData(): Promise<OverviewDataResponse> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${process.env.SERVER_API_URL}/api/v1/overview`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
		});

		const data: OverviewDataResponse = await res.json();

		if (!res.ok) {
			throw new Error("Failed to fetch overview data");
		}
		return data;
	} catch (error) {
		console.error("Error fetching overview data:", error);
		return {
			totals: {
				sources: 0,
				articles: 0,
				processedArticles: 0,
				members: 0,
			},
		};
	}
}
