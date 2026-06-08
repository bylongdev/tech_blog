import dotenv from "dotenv";
import path from "node:path";

// Specify the path to the .env file in the root of the project
dotenv.config({
	path: path.resolve(process.cwd(), "../../.env"),
});

// This file is responsible for setting up the connection to Redis for the worker queues.
export const redisConfig = {
	host: process.env.REDIS_HOST ?? "localhost",
	port: Number(process.env.REDIS_PORT) ?? 6379,

	maxRetriesPerRequest: null, // Disable retries to wait for Redis if it is down
};
