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

export interface ArticleCountByMonth {
  month: string;
  raw: number;
  processed: number;
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

export async function getArticles(): Promise<ArticleCountByMonth[]> {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.SERVER_API_URL}/api/v1/articles/count-by-month`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );

    const data: { countByMonth: ArticleCountByMonth[] } = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch articles data");
    }
    return data.countByMonth;
  } catch (error) {
    console.error("Error fetching articles data:", error);
    return []; // Return an empty array or handle the error as needed
  }
}
