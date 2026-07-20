import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth = await getCurrentUser();

	if (!auth) {
		redirect("/login");
	}

	return children;
}
