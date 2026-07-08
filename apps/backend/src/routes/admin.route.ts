import { Router, type Router as ExpressRouter } from "express";

import { asyncHandler } from "../middleware/async-handler.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

export const adminRouter: ExpressRouter = Router();

adminRouter.get(
	"/users",
	requireAuth,
	requireRole("ADMIN"),
	asyncHandler(async (_request, response) => {
		const users = await userService.listUsers();
		response.status(200).json({ users });
	}),
);
