import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const cookie = request.headers.get("cookie");

	const response = await fetch(`${process.env.SERVER_API_URL}/auth/logout`, {
		method: "POST",
		headers: cookie
			? {
					cookie,
					"CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID!,
					"CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET!,
				}
			: {
					"CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID!,
					"CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET!,
				},
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
