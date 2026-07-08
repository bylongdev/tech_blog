import path from "node:path";

import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
	path: path.resolve(process.cwd(), "../../.env"),
});

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	DATABASE_URL: z.string().min(1),
	SESSION_SECRET: z
		.string()
		.min(32, "SESSION_SECRET must be at least 32 characters long."),
	FRONTEND_ORIGIN: z.url().default("http://localhost:3000"),
	BACKEND_PORT: z.coerce.number().int().positive().default(4000),
	SESSION_COOKIE_NAME: z.string().min(1).default("techblog.sid"),
	SESSION_TTL_HOURS: z.coerce.number().int().positive().default(24),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	const message = parsedEnv.error.issues
		.map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
		.join("; ");

	throw new Error(`Invalid backend environment configuration: ${message}`);
}

export const env = parsedEnv.data;
