import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export interface UserDetail {
	id: string;
	name: string;
	email: string;
	role: string;
	isActive: boolean | "true" | "false";
	createdAt: string;
	updatedAt: string;
}

interface UserDetailResponse {
	user: UserDetail;
	message?: string;
}

export async function getUser(id: string): Promise<UserDetail> {
	const cookieStore = await cookies();
	const response = await fetch(
		`${process.env.SERVER_API_URL}/api/v1/users/${encodeURIComponent(id)}`,
		{
			headers: {
				Cookie: cookieStore.toString(),
			},
			cache: "no-store",
		},
	);

	if (response.status === 404) {
		notFound();
	}

	const data = (await response.json()) as UserDetailResponse;

	if (!response.ok) {
		throw new Error(data.message ?? "Failed to fetch user.");
	}

	return data.user;
}
