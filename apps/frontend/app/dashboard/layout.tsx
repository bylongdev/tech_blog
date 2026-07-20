import { getCurrentUser } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<SidebarProvider>
			<AppSidebar user={user.user} />
			<SidebarInset className="flex flex-1 flex-col overflow-auto">
				<header className="sticky top-0 z-10 flex h-14 shrink-0 items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
					<SidebarTrigger className="h-full px-6" />
					<Separator orientation="vertical" className="mr-2" />
					<h1 className="text-sm font-medium">Dashboard</h1>
				</header>
				<div className="flex flex-1 flex-col p-4 md:p-6">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
