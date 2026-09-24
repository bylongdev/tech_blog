import { Router } from "express";

import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../middleware/async-handler.js";

import { ArticleServiceV2 } from "../../../services/article.service.js";

export const articlesRouter: Router = Router();

articlesRouter.get(
	"/",
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		try {
			const query = req.query;

			const articleService = new ArticleServiceV2();
			const articles = await articleService.listArticles({ skip: query.skip });

			res.status(200).json({ articles });
		} catch (error) {
			next(error);
		}
	}),
);
