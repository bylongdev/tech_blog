import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export async function requireAuth() {
	const cookieStore = await cookies();

	const response = await fetch(`${process.env.SERVER_API_URL}/auth/me`, {
		headers: {
			cookie: cookieStore.toString(),
		},
		cache: "no-store",
	});

	/* 	if (!response.ok) {
		redirect("/login");
	} */

	return response.json();
}

export async function getCurrentUser() {
	const cookieStore = await cookies();

	const response = await fetch(`${process.env.SERVER_API_URL}/auth/me`, {
		headers: {
			cookie: cookieStore.toString(),
		},
		cache: "no-store",
	});

	if (!response.ok) {
		return null;
	}

	return response.json();
}
