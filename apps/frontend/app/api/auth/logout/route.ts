import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const cookie = request.headers.get("cookie");

	const response = await fetch(`${process.env.SERVER_API_URL}/auth/logout`, {
		method: "POST",
		headers: cookie ? { cookie } : {},
		cache: "no-store",
	});

	const nextResponse = new NextResponse(null, {
		status: response.status,
	});
	const setCookie = response.headers.get("set-cookie");

	if (setCookie) {
		nextResponse.headers.set("set-cookie", setCookie);
	}

	return nextResponse;
}
