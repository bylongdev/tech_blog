import { Router, type Router as ExpressRouter } from "express";

import { env } from "../config/env.js";
import { asyncHandler } from "../middleware/async-handler.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { AuthService } from "../services/auth.service.js";
import { loginSchema, registerSchema } from "../auth/auth.schema.js";
import { beginUserSession, endUserSession } from "../auth/session-auth.js";

const authService = new AuthService();

export const authRouter: ExpressRouter = Router();

authRouter.post(
	"/register",
	asyncHandler(async (request, response) => {
		const input = registerSchema.parse(request.body);
		const user = await authService.register(input);

		await beginUserSession(request, user.id);

		response.status(201).json({ user });
	}),
);

authRouter.post(
	"/login",
	asyncHandler(async (request, response) => {
		const input = loginSchema.parse(request.body);
		const user = await authService.login(input);

		await beginUserSession(request, user.id);

		response.status(200).json({ user });
	}),
);

authRouter.post(
	"/logout",
	asyncHandler(async (request, response) => {
		if (request.session.userId) {
			await endUserSession(request);
		}

		response.clearCookie(env.SESSION_COOKIE_NAME);
		response.status(204).end();
	}),
);

authRouter.get(
	"/me",
	requireAuth,
	asyncHandler(async (request, response) => {
		response.status(200).json({
			user: request.currentUser,
		});
	}),
);
