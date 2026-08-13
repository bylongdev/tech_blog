"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { type ChartConfig } from "@/components/ui/chart";
import { getData, getArticles, ArticleCountByMonth } from "./get-data";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

const chartConfig = {
  raw: {
    label: "Raw Articles",
    color: "#2563eb",
  },
  processed: {
    label: "Processed Articles",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

function parseMonthlyCount(data: ArticleCountByMonth[], year: number) {
  const monthlyData = [
    { month: "January", raw: 0, processed: 0 },
    { month: "February", raw: 0, processed: 0 },
    { month: "March", raw: 0, processed: 0 },
    { month: "April", raw: 0, processed: 0 },
    { month: "May", raw: 0, processed: 0 },
    { month: "June", raw: 0, processed: 0 },
    { month: "July", raw: 0, processed: 0 },
    { month: "August", raw: 0, processed: 0 },
    { month: "September", raw: 0, processed: 0 },
    { month: "October", raw: 0, processed: 0 },
    { month: "November", raw: 0, processed: 0 },
    { month: "December", raw: 0, processed: 0 },
  ];

  if (!data || data.length === 0) {
    console.warn("No article data available to parse.");
    return monthlyData;
  }

  const inYearData = data.filter((item) => {
    const itemYear = new Date(item.month).getFullYear();
    return itemYear === year;
  });

  if (inYearData.length === 0) {
    console.warn(`No article data found for the year ${year}.`);
    return monthlyData;
  }

  inYearData.forEach((item) => {
    const month = new Date(item.month).toLocaleString("default", {
      month: "long",
    });

    monthlyData.forEach((monthData) => {
      if (monthData.month === month) {
        monthData.raw = item.raw;
        monthData.processed = item.processed;
      }
    });
  });
  return monthlyData;
}

export default function OverviewPage() {
  const [data, setData] = useState({
    totals: {
      sources: 0,
      articles: 0,
      processedArticles: 0,
      members: 0,
    },
  });

  const [articlesByMonth, setArticlesByMonth] = useState<
    { month: string; raw: number; processed: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const articleData = await getArticles();
        setData(data);
        setArticlesByMonth(
          parseMonthlyCount(articleData, new Date().getFullYear()),
        );
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };
    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h2 className="text-5xl font-medium">Hey there, Welcome back!</h2>
      <div className="mt-4 flex w-full flex-col gap-4">
        <div className="grid grid-cols-4 gap-4 tracking-wide">
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between gap-4 text-[16px] text-zinc-400/60">
              <div className="">Sources</div>
              <div
                className={`${true ? (true ? "text-green-500" : "text-red-500") : "text-zinc-400"} flex items-center gap-1`}
              >
                {true ? (
                  true ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )
                ) : (
                  <Minus />
                )}
                <Label>10%</Label>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="mb-4 text-5xl font-medium tracking-wider">
                {data.totals.sources}
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between gap-4 text-[16px] text-zinc-400/60">
              <div className="">Raw Articles</div>
              <div
                className={`${true ? (true ? "text-green-500" : "text-red-500") : "text-zinc-400"} flex items-center gap-1`}
              >
                {true ? (
                  true ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )
                ) : (
                  <Minus />
                )}
                <Label>20%</Label>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="mb-4 text-5xl font-medium tracking-wider">
                {data.totals.articles}
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between gap-4 text-[16px] text-zinc-400/60">
              <div className="">Published Articles</div>
              <div
                className={`${true ? (false ? "text-green-500" : "text-red-500") : "text-zinc-400"} flex items-center gap-1`}
              >
                {true ? (
                  false ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )
                ) : (
                  <Minus />
                )}
                <Label>-10%</Label>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="mb-4 text-5xl font-medium tracking-wider">
                {data.totals.processedArticles}
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between gap-4 text-[16px] text-zinc-400/60">
              <div className="">Members</div>
              <div
                className={`${false ? (true ? "text-green-500" : "text-red-500") : "text-zinc-400"} flex items-center gap-1`}
              >
                {false ? (
                  true ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )
                ) : (
                  <Minus />
                )}
                <Label>10%</Label>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="mb-4 text-5xl font-medium tracking-wider">
                {data.totals.members}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardHeader className="flex font-mono text-2xl font-semibold tracking-wide">
              Fetch Activity
            </CardHeader>
            <CardContent className="mt-4">
              <ChartContainer
                config={chartConfig}
                className="max-h-120 min-h-50 w-full"
              >
                <BarChart accessibilityLayer data={articlesByMonth}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    tickFormatter={(tick) => tick.slice(0, 3)}
                  />
                  <YAxis tickLine={false} tickFormatter={(tick) => `${tick}`} />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Bar dataKey="raw" fill="var(--color-raw)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-1 justify-between">
          <Card>
            <CardContent>Pending Reviews</CardContent>
          </Card>
          <Card>
            <CardContent>Published Articles</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
