import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../middleware/async-handler.js";

import { OverviewService } from "../../../services/overview.service.js";

export const overviewRouter: Router = Router();

overviewRouter.get(
	"/",
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const overviewService = new OverviewService();
		const overview = await overviewService.getOverview();
		res.status(200).json(overview);
	}),
);
