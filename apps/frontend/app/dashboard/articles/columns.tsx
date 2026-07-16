"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Article = {
	id: string;
	rawArticleId: string;

	category?: string;
	subCategory?: string;
	class?: string;
	status: string;

	createdAt: string;
	updatedAt: string;
};

function HiddenCell({ value }: { value: string }) {
	const [hidden, setHidden] = useState(true);

	const hiddenValue = value.slice(0, 4) + "*".repeat(6) + value.slice(-4);

	return (
		<span
			className="text-sm text-zinc-300/70 cursor-pointer"
			onClick={() => setHidden((prev) => !prev)}
		>
			{hidden ? hiddenValue : value}
		</span>
	);
}

export const columns: ColumnDef<Article>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => {
			return <HiddenCell value={row.getValue("id")} />;
		},
	},
	{
		accessorKey: "rawArticleId",
		header: "Raw Article ID",
		cell: ({ row }) => {
			return <HiddenCell value={row.getValue("rawArticleId")} />;
		},
	},
	{
		accessorKey: "category",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Category
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "subCategory",

		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Sub Category
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "class",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Class
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Created At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];
