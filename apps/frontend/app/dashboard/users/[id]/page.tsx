import React from "react";
import { getUser } from "./get-user";

async function UserPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	console.log("UserPage params:", id);
	const user = await getUser(id);

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">UserPage</div>
	);
}

export default UserPage;
