"use client";

import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { ArticleDetail } from "./get-article";
// import { redirect, useRouter } from "next/navigation";

/* function formatDate(value: string | null) {
	if (!value) {
		return "-";
	}

	return new Intl.DateTimeFormat("en-AU", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(value));
} */

function formatDateTime(value: string | null) {
	if (!value) {
		return "-";
	}

	return new Intl.DateTimeFormat("en-AU", {
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(value));
}

function DisplayField({
	label,
	children,
	className,
}: {
	label: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={className}>
			<dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
				{label}
			</dt>
			<dd className="mt-1.5 wrap-break-words text-sm">{children}</dd>
		</div>
	);
}

function ChipList({ values }: { values: string[] }) {
	if (values.length === 0) {
		return <span className="text-muted-foreground">-</span>;
	}

	return (
		<div className="flex flex-wrap gap-1.5">
			{values.map((value) => (
				<Badge
					key={value}
					variant="secondary"
				>
					{value}
				</Badge>
			))}
		</div>
	);
}

export function ArticleHeader({ article }: { article: ArticleDetail }) {
	return (
		<header className="space-y-4">
			<Button
				variant="ghost"
				size="sm"
				render={<Link href="/dashboard/articles" />}
				nativeButton={false}
			>
				<ArrowLeft />
				Back to articles
			</Button>
			<div className="space-y-3">
				<div className="flex flex-wrap items-center gap-2">
					<Badge>{article.status}</Badge>
					<Badge variant="outline">{article.rawArticle.source.name}</Badge>
				</div>
				<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl px-2">
					{article.cleanedTitle}
				</h1>
				{/* <dl className="flex gap-3 text-sm text-muted-foreground flex-wrap justify-around">
					<DisplayField label="Published date">
						{formatDate(article.rawArticle.publishedAt)}
					</DisplayField>
					<DisplayField label="Created date">
						{formatDateTime(article.createdAt)}
					</DisplayField>
				</dl> */}
			</div>
		</header>
	);
}

export function SummaryCard({ article }: { article: ArticleDetail }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Summary</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="space-y-5">
					<DisplayField label="Title">{article.cleanedTitle}</DisplayField>
					<Separator />
					<DisplayField label="Summary">
						<p className="whitespace-pre-wrap leading-6 text-muted-foreground">
							{article.summary ?? "-"}
						</p>
					</DisplayField>
				</dl>
			</CardContent>
		</Card>
	);
}

export function MetadataCard({ article }: { article: ArticleDetail }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>AI Metadata</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid gap-5 sm:grid-cols-2">
					<DisplayField label="Category">
						{article.category ? <Badge>{article.category}</Badge> : "-"}
					</DisplayField>
					<DisplayField label="Sub category">
						{article.subCategory ? (
							<Badge variant="secondary">{article.subCategory}</Badge>
						) : (
							"-"
						)}
					</DisplayField>
					<DisplayField label="Class">
						{article.class ? (
							<Badge variant="outline">{article.class}</Badge>
						) : (
							"-"
						)}
					</DisplayField>
					<DisplayField label="Event">
						{article.event ? (
							<Badge variant="outline">{article.event}</Badge>
						) : (
							"-"
						)}
					</DisplayField>
					<DisplayField
						label="Entities"
						className="sm:col-span-2"
					>
						<ChipList values={article.entities} />
					</DisplayField>
					<DisplayField
						label="Products"
						className="sm:col-span-2"
					>
						<ChipList values={article.products} />
					</DisplayField>
				</dl>
			</CardContent>
		</Card>
	);
}

export function SourceCard({ article }: { article: ArticleDetail }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Source Information</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid gap-5 sm:grid-cols-2">
					<DisplayField label="Source name">
						{article.rawArticle.source.name}
					</DisplayField>
					<DisplayField label="Author">
						{article.rawArticle.author ?? "-"}
					</DisplayField>
					<DisplayField
						label="Original URL"
						className="sm:col-span-2"
					>
						<a
							className="inline-flex items-center gap-1 text-primary underline underline-offset-4"
							href={article.rawArticle.link}
							target="_blank"
							rel="noreferrer"
						>
							<span className="break-all">{article.rawArticle.link}</span>
							<ExternalLink className="size-3.5 shrink-0" />
						</a>
					</DisplayField>
					<DisplayField label="Published at">
						{formatDateTime(article.rawArticle.publishedAt)}
					</DisplayField>
					<DisplayField label="Fetched at">
						{formatDateTime(article.rawArticle.fetchedAt)}
					</DisplayField>
				</dl>
			</CardContent>
		</Card>
	);
}

export function ProcessingCard({ article }: { article: ArticleDetail }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Processing Information</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid gap-5 sm:grid-cols-2">
					<DisplayField label="Candidate ID">
						<span className="font-mono text-xs">{article.id}</span>
					</DisplayField>
					<DisplayField label="Raw article ID">
						<span className="font-mono text-xs">{article.rawArticleId}</span>
					</DisplayField>
					<DisplayField label="Group ID">
						{article.groupId ? (
							<span className="font-mono text-xs">{article.groupId}</span>
						) : (
							"-"
						)}
					</DisplayField>
					<DisplayField label="Status">
						<Badge>{article.status}</Badge>
					</DisplayField>
					<DisplayField label="Created at">
						{formatDateTime(article.createdAt)}
					</DisplayField>
					<DisplayField label="Updated at">
						{formatDateTime(article.updatedAt)}
					</DisplayField>
				</dl>
			</CardContent>
		</Card>
	);
}

export function RawDataAccordion({ article }: { article: ArticleDetail }) {
	const aiMetadata = {
		category: article.category,
		subCategory: article.subCategory,
		class: article.class,
		event: article.event,
		entities: article.entities,
		products: article.products,
		summary: article.summary,
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Raw Data</CardTitle>
			</CardHeader>
			<CardContent>
				<Accordion>
					{/* 	<AccordionItem value="original-summary">
						<AccordionTrigger>Original Summary</AccordionTrigger>
						<AccordionContent>
							<pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-md bg-muted p-3 font-sans text-sm leading-6">
								{article.rawArticle.summary ?? "-"}
							</pre>
						</AccordionContent>
					</AccordionItem> */}
					<AccordionItem value="raw-content">
						<AccordionTrigger>Raw Content</AccordionTrigger>
						<AccordionContent>
							<pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-muted p-3 font-sans text-sm leading-6">
								{article.rawArticle.content ?? "-"}
							</pre>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="ai-metadata-json">
						<AccordionTrigger>AI Metadata JSON</AccordionTrigger>
						<AccordionContent>
							<pre className="max-h-96 overflow-auto rounded-md bg-muted p-3 font-mono text-xs leading-6">
								{JSON.stringify(aiMetadata, null, 2)}
							</pre>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	);
}
