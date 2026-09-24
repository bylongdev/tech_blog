import { Router } from "express";

import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../middleware/async-handler.js";

import { ArticleServiceV2 } from "../../../services/article.service.js";

export const articlesRouter: Router = Router();

articlesRouter.get(
	"/",
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const articleService = new ArticleServiceV2();
		const articles = await articleService.listArticles();
		res.status(200).json({ articles });
	}),
);
