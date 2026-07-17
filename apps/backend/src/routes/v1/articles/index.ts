import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../middleware/async-handler.js";

import { HttpError } from "../../../lib/http-error.js";
import { ArticleService } from "../../../services/article.service.js";

export const articlesRouter: Router = Router();

articlesRouter.get(
	"/",
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const articleService = new ArticleService();
		const articles = await articleService.listArticles();
		res.status(200).json({ articles });
	}),
);

articlesRouter.get(
	"/:id",
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;

		if (!id || Array.isArray(id)) {
			throw new HttpError(400, "Article ID is required.");
		}

		const articleService = new ArticleService();
		const article = await articleService.getArticleById(id);

		if (!article) {
			throw new HttpError(404, "Article not found.");
		}

		res.status(200).json({ article });
	}),
);
