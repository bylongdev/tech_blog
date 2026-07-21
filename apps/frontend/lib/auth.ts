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
	const user = await getCurrentUser();

	if (!user) {
		return null;
	}

	if (!user.user.role || user.user.role !== "ADMIN") {
		return null;
	}

	return user as AuthResponse;
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
