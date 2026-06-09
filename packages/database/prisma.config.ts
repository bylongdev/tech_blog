import path from "node:path";
import dotenv from "dotenv";
// Specify the path to the .env file in the database package
dotenv.config({
	path: path.resolve(process.cwd(), "../../.env"),
});

import { defineConfig, env } from "prisma/config";

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		url: env("DATABASE_URL"),
	},
});
