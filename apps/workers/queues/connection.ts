import { Redis } from "ioredis";
import dotenv from "dotenv";
import path from "node:path";

// Specify the path to the .env file in the root of the project
dotenv.config({
	path: path.resolve(process.cwd(), "../../.env"),
});

export const redis = new Redis({
	host: process.env.REDIS_HOST,
	port: Number(process.env.REDIS_PORT),

	maxRetriesPerRequest: null,
});
