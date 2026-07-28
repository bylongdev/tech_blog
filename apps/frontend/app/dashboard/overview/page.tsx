"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid } from "recharts";

import { type ChartConfig } from "@/components/ui/chart";
import { getData } from "./get-data";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function OverviewPage() {
  const [data, setData] = useState({
    totals: {
      sources: 0,
      articles: 0,
      processedArticles: 0,
      members: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        console.log("Fetched overview data:", data);
        setData(data);
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
          <Card className="flex flex-col justify-between font-mono">
            <CardHeader className="flex items-center justify-between gap-4 text-lg text-zinc-400/60">
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
            <CardContent className="flex justify-center text-5xl font-medium tracking-wider">
              {data.totals.sources}
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between gap-4 text-lg text-zinc-400/60">
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
            <CardContent className="flex justify-center text-5xl font-medium tracking-wider">
              {data.totals.articles}
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between gap-4 text-lg text-zinc-400/60">
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
            <CardContent className="flex justify-center text-5xl font-medium tracking-wider">
              {data.totals.processedArticles}
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between gap-4 text-lg text-zinc-400/60">
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
            <CardContent className="flex justify-center text-5xl font-medium tracking-wider">
              {data.totals.members}
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
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
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
