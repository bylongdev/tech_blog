import { NextResponse } from "next/server";
import dotenv from "dotenv";

export async function POST(request: Request) {
	const body = await request.json();

	const response = await fetch(`${process.env.SERVER_API_URL}/auth/login`, {
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
