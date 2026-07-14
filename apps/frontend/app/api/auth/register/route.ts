import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();

	const response = await fetch(`${process.env.SERVER_API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
		cache: "no-store",
	});

	const data = await response.json();

	const nextResponse = NextResponse.json(data, {
		status: response.status,
	});

	return nextResponse;
}
