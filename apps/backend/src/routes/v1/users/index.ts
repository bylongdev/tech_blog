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

usersRouter.get(
	"/:id",
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id;
		const userService = new UserService();
		const user = await userService.getUserById(userId as string);
		if (!user) {
			res.status(404).json({ message: "User not found" });
		} else {
			res.status(200).json({ user });
		}
	}),
);
