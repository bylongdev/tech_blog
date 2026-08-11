import React from "react";
import { getUser } from "./get-user";
import { UserHeader, UserProfile } from "./user-details";

async function UserPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	console.log("UserPage params:", id);
	const user = await getUser(id);

	if (!user) {
		return (
			<div className="flex flex-1 justify-center items-center h-full">
				<p className="text-lg font-medium text-muted-foreground">
					User not found
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
			<UserHeader user={user} />
			<UserProfile user={user} />
		</div>
	);
}

export default UserPage;
