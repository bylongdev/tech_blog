"use client";

import {
	ChevronsUpDown,
	LayoutDashboard,
	LogOut,
	Monitor,
	Moon,
	Newspaper,
	Sun,
	User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import type { AuthenticatedUser } from "@/lib/auth";
interface AppSidebarProps {
	user: AuthenticatedUser;
}

const themes = [
	{ value: "light", label: "Light", icon: Sun },
	{ value: "dark", label: "Dark", icon: Moon },
	{ value: "system", label: "System", icon: Monitor },
] as const;

function getInitials(user: AuthenticatedUser) {
	const name = user.name?.trim();

	if (name) {
		return name
			.split(/\s+/)
			.slice(0, 2)
			.map((part) => part[0])
			.join("")
			.toUpperCase();
	}

	return user.email.charAt(0).toUpperCase();
}

export function AppSidebar({ user }: AppSidebarProps) {
	const router = useRouter();
	const pathname = usePathname();

	const { theme, setTheme } = useTheme();
	const { setOpenMobile } = useSidebar();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const auth = user.role === "ADMIN";

	const sidebarMenuItems = [
		{
			label: "Dashboard",
			href: "/dashboard/overview",
			icon: LayoutDashboard,
		},
		{
			label: "Articles",
			href: "/dashboard/articles",
			icon: Newspaper,
		},
		...(auth
			? [
					{
						label: "Users",
						href: "/dashboard/users",
						icon: User,
					},
				]
			: []),
	];

	const handleLogout = async () => {
		setIsLoggingOut(true);

		try {
			const response = await fetch("/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Unable to log out. Please try again.");
			}

			router.replace("/login");
			router.refresh();
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Unable to log out. Please try again.",
			);
			setIsLoggingOut(false);
		}
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							render={<Link href="/dashboard" />}
							tooltip="Tech Blog"
							onClick={() => setOpenMobile(false)}
						>
							<div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<Newspaper />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">Tech Blog</span>
								<span className="truncate text-xs text-sidebar-foreground/70">
									Content pipeline
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Workspace</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{sidebarMenuItems.map(({ label, href, icon: Icon }) => (
								<SidebarMenuItem key={label}>
									<SidebarMenuButton
										render={<Link href={href} />}
										isActive={pathname === href}
										tooltip={label}
										onClick={() => setOpenMobile(false)}
									>
										<Icon />
										<span>{label}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<SidebarMenuButton
										size="lg"
										className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
									/>
								}
							>
								<Avatar className="size-8 rounded-lg">
									<AvatarFallback className="rounded-lg">
										{getInitials(user)}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium capitalize">
										{user.name?.trim() || "Account"}
									</span>
									<span className="truncate text-xs text-sidebar-foreground/70">
										{user.email}
									</span>
								</div>
								<ChevronsUpDown className="ml-auto" />
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								side="right"
								sideOffset={12}
								className="min-w-56"
							>
								<DropdownMenuGroup>
									<DropdownMenuLabel>
										<div className="flex flex-col gap-0.5">
											<span className="font-medium text-foreground capitalize">
												{user.name?.trim() || user.email}
											</span>
											<span className="font-normal uppercase tracking-wide">
												{user.role}
											</span>
										</div>
									</DropdownMenuLabel>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuLabel>Theme</DropdownMenuLabel>
									<DropdownMenuRadioGroup
										value={theme}
										onValueChange={setTheme}
									>
										{themes.map(({ value, label, icon: Icon }) => (
											<DropdownMenuRadioItem
												key={value}
												value={value}
												onClick={() => setTheme(value)}
											>
												<Icon />
												<span>{label}</span>
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									variant="destructive"
									disabled={isLoggingOut}
									onClick={handleLogout}
								>
									<LogOut />
									<span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
