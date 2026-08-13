import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`${process.env.SERVER_API_URL}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
  });

  const data = await response.json();

  const nextResponse = NextResponse.json(data, {
    status: response.status,
  });

  return nextResponse;
}
