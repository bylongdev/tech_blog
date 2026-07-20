import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth = await requireAuth();

	if (auth) {
		redirect("/dashboard");
	}

	return children;
}
