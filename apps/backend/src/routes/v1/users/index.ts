import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../middleware/async-handler.js";

import { UserService } from "../../../services/user.service.js";

export const usersRouter: Router = Router();

usersRouter.get(
	"/",
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const userService = new UserService();
		const users = await userService.listUsers();
		res.status(200).json({ users });
	}),
);
