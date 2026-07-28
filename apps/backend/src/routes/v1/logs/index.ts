import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../middleware/async-handler.js";

import { LogService } from "../../../services/log.service.js";

export const logRouter: Router = Router();

logRouter.get(
	"/",
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const logService = new LogService();
		const logs = await logService.getLogs();
		res.status(200).json(logs);
	}),
);
