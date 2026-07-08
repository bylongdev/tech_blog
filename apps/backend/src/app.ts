import cors from "cors";
import express, { type Express } from "express";
import session from "express-session";

import { PrismaSessionStore } from "./auth/prisma-session.store.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";
import { adminRouter } from "./routes/admin.route.js";
import { authRouter } from "./routes/auth.route.js";
import { healthRouter } from "./routes/health.route.js";

const sessionTtlMs = env.SESSION_TTL_HOURS * 60 * 60 * 1000;

export function createApp(): Express {
	const app = express();

	app.disable("x-powered-by");
	app.set("trust proxy", 1);

	app.use(
		cors({
			origin: env.FRONTEND_ORIGIN,
			credentials: true,
		}),
	);
	app.use(express.json());
	app.use(
		session({
			name: env.SESSION_COOKIE_NAME,
			secret: env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			rolling: true,
			store: new PrismaSessionStore(),
			cookie: {
				httpOnly: true,
				maxAge: sessionTtlMs,
				sameSite: "lax",
				secure: env.NODE_ENV === "production",
			},
		}),
	);

	app.use("/health", healthRouter);
	app.use("/auth", authRouter);
	app.use("/admin", adminRouter);

	app.use((_req, res) => {
		res.status(404).json({
			message: "Route not found.",
		});
	});

	app.use(errorHandler);

	return app;
}
