"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
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
  const { setTheme } = useTheme();

  return (
    <div className="min-h-dvh min-w-dvw">
      <main className="m-auto flex h-full w-10/12 max-w-7xl flex-col items-center justify-center gap-4">
        <section className="flex w-full flex-col">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2">
              <div className="p-4 text-5xl font-semibold">TL;DR</div>
              <div className="flex flex-col text-xs">
                <span>Tech News</span>
                <span>Without the noise.</span>
              </div>
            </div>
            <Field className="w-xl" orientation="horizontal">
              <Input id="input-search" placeholder="Search..." type="search" />
              <Button>Search</Button>
            </Field>
            <div className="flex items-center gap-4">
              <Switch
                id="theme-switch"
                onCheckedChange={() =>
                  setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
              />
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
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
        <section className="flex w-full flex-1 flex-col">
          <Card>
            <CardHeader>
              <Avatar className="mr-4 h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              Good Morning, User
            </CardHeader>
            <CardContent>
              We will fetch and display news articles based on the selected
              category. Stay tuned for updates!
            </CardContent>
          </Card>
        </section>

        <section className="flex w-full flex-1 flex-col">
          <div className="pb-2">Latest News</div>
          <div className="">
            <Card>
              <CardContent className="flex gap-12">
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="">
                    <h3 className="">Title</h3>
                    <div className="">
                      Content of the news article will be displayed here. This
                      is a placeholder for the actual news content that will be
                      fetched based on the selected category. lorem ipsum dolor
                      sit amet, consectetur adipiscing elit. Sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. lorem
                      ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                  </div>
                </div>

                <div className="flex w-xl flex-col items-start justify-between gap-2">
                  <span className="">Author: John Doe</span>
                  <span className="">2 mins reading</span>
                  <Button variant="link" className="self-end">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

export default News;
