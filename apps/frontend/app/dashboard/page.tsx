import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

export default function DashboardPage() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Card className="dark:bg-zinc-600/20 flex flex-1 h-full">
				<CardHeader className="flex flex-col items-center justify-center gap-4">
					<div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
						Welcome to the Dashboard!
					</div>
					<div className="text-sm text-zinc-400/80">
						This is your dashboard where you can manage your account and view
						your data.
					</div>
				</CardHeader>
				<CardContent className="flex flex-col items-center justify-center gap-4">
					<div className="text-sm text-zinc-400/80">
						You can add more components and features to your dashboard as
						needed.
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
