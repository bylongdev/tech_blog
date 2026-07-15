import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getCurrentUser();

	if (user) {
		redirect("/dashboard");
	}

	return children;
}
