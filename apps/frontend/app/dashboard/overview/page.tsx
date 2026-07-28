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
      <h2 className="text-6xl font-medium">Hey there, Welcome back!</h2>
      <div className="mt-4 flex w-full flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <Card className="flex flex-col justify-between font-mono text-2xl font-semibold tracking-wide">
            <CardHeader className="flex justify-center">Sources</CardHeader>
            <CardContent className="flex justify-center text-6xl tracking-wider">
              {data.totals.sources}
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex justify-center">
              Raw Articles
            </CardHeader>
            <CardContent className="flex justify-center text-6xl tracking-wider">
              {data.totals.articles}
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex justify-center">
              Published Articles
            </CardHeader>
            <CardContent className="flex justify-center text-6xl tracking-wider">
              {data.totals.processedArticles}
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader className="flex justify-center">Members</CardHeader>
            <CardContent className="flex justify-center text-6xl tracking-wider">
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
