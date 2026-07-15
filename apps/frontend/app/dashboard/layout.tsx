import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
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

	return (
		<SidebarProvider>
			<AppSidebar user={auth.user} />
			<SidebarInset>
				<header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-vertical:h-4"
					/>
					<h1 className="text-sm font-medium">Dashboard</h1>
				</header>
				<div className="flex flex-1 flex-col p-4 md:p-6">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
