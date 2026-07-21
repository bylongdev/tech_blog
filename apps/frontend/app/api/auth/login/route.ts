import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const apiUrl = process.env.SERVER_API_URL;

	const body = await request.json();

	const response = await fetch(`${apiUrl}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID!,
			"CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET!,
		},
		body: JSON.stringify(body),
		cache: "no-store",
	});

	const contentType = response.headers.get("content-type");
	const text = await response.text();

	console.log("Backend URL:", `${process.env.SERVER_API_URL}/auth/login`);
	console.log("Backend status:", response.status);
	console.log("Content-Type:", contentType);
	console.log("Backend response:", text);

	// const data = await response.json();
	const data = text ? JSON.parse(text) : {};

	const nextResponse = NextResponse.json(data, {
		status: response.status,
	});

	const cookie = response.headers.get("set-cookie");

	if (cookie) {
		nextResponse.headers.set("set-cookie", cookie);
	}

	return nextResponse;
}
