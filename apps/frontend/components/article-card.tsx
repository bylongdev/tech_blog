import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { LinkIcon, SquareArrowOutUpRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
          <Card key={article.id} className="">
            <CardContent className="grid min-h-48 grid-cols-6 gap-8">
              <div className="col-span-2 flex items-center justify-center gap-4 rounded-sm border border-zinc-300/20">
                {article.rawArticle.imageUrl?.[0] ? (
                  <Image
                    src={
                      article.rawArticle.imageUrl?.[0] ||
                      "/images/placeholder.jpg"
                    }
                    alt={article.cleanedTitle}
                    width={300}
                    height={200}
                    className="aspect-5/3 h-full w-full rounded-sm object-cover object-center"
                  />
                ) : null}
              </div>

              <div className="col-span-4 flex flex-col items-center justify-center gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">
                    {article.cleanedTitle}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-zinc-400/60">
                    <h4 className="flex items-center gap-1">
                      <span className="inline-flex items-center gap-1">
                        <LinkIcon className="h-3 w-3" />
                      </span>
                      <span>
                        {article.rawArticle.source?.name || "Unknown Source"}
                      </span>
                    </h4>
                    <Label className="">
                      {Math.ceil(
                        article.rawArticle.content.split(" ").length / 200,
                      )}{" "}
                      mins read
                    </Label>
                    {/* <Label className="text-sm text-zinc-400/60">
                      {formatDistanceToNow(
                        new Date(article.rawArticle.publishedAt),
                        { addSuffix: true },
                      )}
                    </Label> */}
                  </div>
                  <p className="text-muted-foreground indent-4">
                    {article.summary}
                  </p>
                </div>

                <div className="grid w-full grid-cols-2 gap-3">
                  <div className="flex flex-1 items-start justify-between gap-3 text-sm text-zinc-400/60">
                    <Label className="">
                      {article.rawArticle.author || "Unknown"}
                    </Label>
                  </div>

                  <div className="flex flex-col items-end gap-4">
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
                </div>
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
