import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { SquareArrowOutUpRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import Image from "next/image";

type Article = {
  id: string;
  cleanedTitle: string;
  category: string;
  subCategory: string;
  class: string;
  entities: string[];
  products: string[];
  event: string;
  summary: string;
  createdAt: string;
  status: string;
  rawArticle: {
    content: string;
    author: string;
    link: string;
    imageUrl: string;
    publishedAt: string;
    source: {
      name: string;
    };
  };
};

function ArticleCard({
  selectedCategory,
  skip,
}: {
  selectedCategory: string;
  skip: number;
}) {
  const [articles, setArticles] = useState([] as Article[]);

  useEffect(() => {
    // Fetch articles based on the selected category
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v2/articles?skip=${skip}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Category: selectedCategory,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles((prev) => [...prev, ...data.articles]);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, [selectedCategory, skip]);

  return (
    <div className="flex flex-col gap-4">
      {articles.length > 0 ? (
        articles.map((article) => (
          <Card key={article.id} className="p-4">
            <CardContent className="grid min-h-48 grid-cols-6 gap-8">
              <div className="col-span-1 flex items-center justify-center gap-4">
                {article.rawArticle.imageUrl?.[0] ? (
                  <Image
                    src={
                      article.rawArticle.imageUrl?.[0] ||
                      "/images/placeholder.jpg"
                    }
                    alt={article.cleanedTitle}
                    width={200}
                    height={100}
                    className="aspect-4/3 h-full object-cover object-left"
                  />
                ) : null}
              </div>
              <div className="col-span-4 flex items-center justify-center gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    {article.cleanedTitle}
                  </h3>
                  <p className="text-muted-foreground indent-4">
                    {article.summary}
                  </p>
                </div>
                <Separator orientation="vertical" className="" />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-2">
                <div className="flex w-full flex-col items-start gap-3 text-sm text-zinc-400/60">
                  <Label className="">
                    {formatDistanceToNow(
                      new Date(article.rawArticle.publishedAt),
                      { addSuffix: true },
                    )}
                  </Label>
                  <Label className="">
                    {article.rawArticle.author || "Unknown"}
                  </Label>
                  <Label className="">
                    {Math.ceil(
                      article.rawArticle.content.split(" ").length / 200,
                    )}{" "}
                    mins read
                  </Label>
                </div>

                <Link
                  href={article.rawArticle.link}
                  target="_blank"
                  className="flex justify-end"
                >
                  <Button variant="outline" size="sm">
                    Read More <SquareArrowOutUpRight />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No articles available.</div>
      )}
    </div>
  );
}

export default ArticleCard;
