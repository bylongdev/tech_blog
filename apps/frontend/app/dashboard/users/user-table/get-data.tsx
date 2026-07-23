"use server";

import { cookies } from "next/headers";
import { User } from "./columns";

interface UserCandidateResponse {
	users: Array<{
		id: string;
		email: string;
		name?: string;
		role: string;
		isActive: boolean;
	}>;
}

export async function getData(): Promise<User[]> {
	try {
		const cookieStore = await cookies();

		const res = await fetch(`${process.env.SERVER_API_URL}/api/v1/users`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
		});

		const data: UserCandidateResponse & { message?: string } = await res.json();
		console.log("Response from server:", data);

		if (!res.ok) {
			throw new Error(data?.message ?? "Failed to fetch users");
		}

		const users: User[] = data.users.map((user) => ({
			id: user.id,
			email: user.email,
			name: user.name ?? "-",
			role: user.role,
			isActive: user.isActive,
		}));
		return users;
	} catch (error) {
		console.error("Error fetching users:", error);
		return [];
	}
}
