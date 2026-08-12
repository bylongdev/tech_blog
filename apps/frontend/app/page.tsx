"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const CATEGORIES = [
  "all",
  "ai",
  "dev",
  "cloud",
  "security",
  "infrastructure",
  "tools",
];

function News({}: Props) {
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  return (
    <div className="min-h-dvh min-w-dvw bg-zinc-600">
      <main className="m-auto flex h-full w-full max-w-10/12 items-center justify-center bg-teal-600">
        <section className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-between px-8 py-4">
            <div className="flex items-center">
              <div className="bg-amber-600 p-2 text-3xl font-medium">TL;DR</div>
              <div className="flex flex-col text-sm">
                <span>Tech News</span>
                <span>Without the noise.</span>
              </div>
            </div>
            <div className="">
              <Input placeholder="Search..." />
            </div>
            <div className="flex">
              <div className="">Dark Mode</div>
              <div className="">Profile</div>
            </div>
          </div>

          <div className="flex bg-zinc-700 px-12">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={`rounded-none border-0 border-b-2 p-4 text-zinc-300/70 hover:text-zinc-100 ${category === "ai" ? "uppercase" : "capitalize"} ${selectedCategory === category ? "border-zinc-100 text-zinc-100" : "border-transparent"}`}

                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default News;
