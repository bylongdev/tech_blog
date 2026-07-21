// app/api/auth/me/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const cookie = request.headers.get("cookie");

	const response = await fetch(`${process.env.SERVER_API_URL}/auth/me`, {
		headers: cookie
			? {
					cookie,
				}
			: {},
		cache: "no-store",
	});

	const data = await response.json();

	return NextResponse.json(data, {
		status: response.status,
	});
}
