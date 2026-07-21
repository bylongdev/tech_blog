import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();

	const response = await fetch(`${process.env.SERVER_API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID!,
			"CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET!,
		},
		body: JSON.stringify(body),
		credentials: "include",
		cache: "no-store",
	});

	const data = await response.json();

	console.log("Response from server:", data);

	const nextResponse = NextResponse.json(data, {
		status: response.status,
	});

	return nextResponse;
}
