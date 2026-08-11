"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "./columns";
import { columns } from "./columns";
import { getData } from "./get-data";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function ArticlesTable() {
	const [data, setData] = useState<Article[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const result = await getData();
			setData(result);
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
		fetchData();
	}, [refreshing]);

	return (
		<div className="w-full h-full flex flex-col flex-1 justify-center">
			<div className={`flex flex-col justify-center items-end w-full`}>
				<Button
					className={`flex gap-2 items-center w-fit mb-4 ${loading ? "opacity-50" : "opacity-100"}`}
					onClick={async () => {
						setLoading(true);
						setRefreshing((prev) => !prev);
					}}
					disabled={loading}
				>
					{loading ? "Loading..." : "Refresh"}{" "}
					<span>
						<RefreshCcw
							className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
						/>
					</span>
				</Button>
			</div>
			{loading ? (
				<div className="flex flex-1 justify-center items-start my-8 w-full h-full">
					<div className="flex w-full max-w-[90%] flex-col justify-around h-full gap-6 max-h-6/12">
						{Array.from({ length: 15 }).map((_, index) => (
							<div
								className="flex gap-6 items-center flex-1 w-full"
								key={index}
							>
								<Skeleton className="min-h-10 h-full flex-1" />
								<Skeleton className="min-h-10 h-full flex-1" />
								<Skeleton className="min-h-10 h-full w-24" />
								<Skeleton className="min-h-10 h-full w-20" />
								<Skeleton className="min-h-10 h-full w-20" />
							</div>
						))}
					</div>
				</div>
			) : (
				<DataTable
					columns={columns}
					data={data}
				/>
			)}
		</div>
	);
}
