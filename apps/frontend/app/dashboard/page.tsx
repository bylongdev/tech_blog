import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import ArticlesTable from "./articles/page";

export default function DashboardPage() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Card className="dark:bg-zinc-600/20 flex flex-1 h-full">
				<CardContent className="flex flex-col items-center flex-1 justify-center gap-4">
					<ArticlesTable />
				</CardContent>
			</Card>
		</div>
	);
}
