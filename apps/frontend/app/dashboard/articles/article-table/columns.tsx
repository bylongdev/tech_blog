"use client";

import { useState } from "react";

import {
	MoreHorizontal,
	Copy as CopyIcon,
	Eye,
	Edit,
	Trash2,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Check } from "lucide-react";
import Link from "next/link";

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
	{
		id: "actions",
		cell: ({ row }) => {
			const article = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button
								variant="ghost"
								size="icon"
								className="h-8"
							/>
						}
					>
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4" />
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>

							<DropdownMenuItem
								className="flex items-center gap-2"
								onClick={() => navigator.clipboard.writeText(article.id)}
							>
								<span className="scale-90">
									<CopyIcon />
								</span>
								Copy ID
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem
								className="flex items-center gap-2"
								render={<Link href={`/dashboard/articles/${article.id}`} />}
								nativeButton={false}
							>
								<span className="scale-90">
									<Eye />
								</span>
								View
							</DropdownMenuItem>
							{/* <DropdownMenuItem
								className="flex items-center gap-2"
								render={<Link href={`/dashboard/articles/${article.id}`} />}
								nativeButton={false}
							>
								<span className="scale-90">
									<Edit />
								</span>
								Edit
							</DropdownMenuItem> */}
							<DropdownMenuItem
								className="flex items-center gap-2"
								variant="destructive"
							>
								<span className="scale-90">
									<Trash2 />
								</span>
								Delete
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
