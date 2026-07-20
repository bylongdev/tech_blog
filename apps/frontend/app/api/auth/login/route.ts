import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const apiUrl = process.env.SERVER_API_URL;

	if (!apiUrl) {
		return NextResponse.json(
			{ message: "SERVER_API_URL is not configured" },
			{ status: 500 },
		);
	}

	const body = await request.json();

	const response = await fetch(`${apiUrl}/auth/login`, {
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

	const cookie = response.headers.get("set-cookie");

	if (cookie) {
		nextResponse.headers.set("set-cookie", cookie);
	}

	return nextResponse;
}
