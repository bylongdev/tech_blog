"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Check } from "lucide-react";

export type Article = {
	id: string;
	rawArticleId: string;

	category?: string;
	subCategory?: string;
	class?: string;
	status: string;

	createdAt: string;
};

function HiddenCell({ value }: { value: string }) {
	const [hidden, setHidden] = useState(true);
	const [copied, setCopied] = useState(false);

	const hiddenValue = value.slice(0, 4) + "*".repeat(6) + value.slice(-4);

	return (
		<div className="flex items-center">
			<div
				className="text-sm text-zinc-300/70 cursor-pointer "
				onClick={() => setHidden((prev) => !prev)}
			>
				<span>{hidden ? hiddenValue : value}</span>
			</div>
			{hidden ? null : (
				<Button
					variant="ghost"
					className="cursor-pointer"
					onClick={() => {
						navigator.clipboard.writeText(value);
						setCopied(true);
						setTimeout(() => setCopied(false), 2000);
					}}
				>
					{copied ? (
						<Check className="ml-2 h-4 w-4" />
					) : (
						<Copy className="ml-2 h-4 w-4" />
					)}
				</Button>
			)}
		</div>
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
