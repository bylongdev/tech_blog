import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export interface AuthenticatedUser {
	id: string;
	email: string;
	name: string | null;
	role: "ADMIN" | "USER";
}

interface AuthResponse {
	user: AuthenticatedUser;
}

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

export async function getCurrentUser(): Promise<AuthResponse | null> {
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

	return (await response.json()) as AuthResponse;
}
