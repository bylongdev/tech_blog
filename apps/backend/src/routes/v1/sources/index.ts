import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../middleware/async-handler.js";

import { SourceService } from "../../../services/source.service.js";

export const sourcesRouter: Router = Router();

sourcesRouter.get(
	"/",
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const sourceService = new SourceService();
		const sources = await sourceService.listSources();
		res.status(200).json({ sources });
	}),
);
