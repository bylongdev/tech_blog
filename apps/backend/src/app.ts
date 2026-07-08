import cors from "cors";
import express, { type Express } from "express";
import session from "express-session";

import { PrismaSessionStore } from "./auth/prisma-session.store.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";

import { apiRouter } from "./routes/index.js";

const sessionTtlMs = env.SESSION_TTL_HOURS * 60 * 60 * 1000;

export function createApp(): Express {
	const app = express();

	app.disable("x-powered-by");
	app.set("trust proxy", 1);

	// CORS middleware should be registered before the session middleware and routes
	app.use(
		cors({
			origin: env.FRONTEND_ORIGIN,
			credentials: true,
		}),
	);
	app.use(express.json());

	// Session middleware should be registered after the CORS middleware and before the routes
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

	// Routes
	app.use("/api/v1", apiRouter);

	// Error handling middleware should be registered after the routes
	app.use((_req, res) => {
		res.status(404).json({
			message: "Route not found.",
		});
	});

	app.use(errorHandler);

	return app;
}
