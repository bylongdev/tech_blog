import path from "node:path";
import dotenv from "dotenv";
// Specify the path to the .env file in the database package
dotenv.config({
	path: path.resolve(process.cwd(), "../../packages/database/.env"),
});

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

// Ensure that the DATABASE_URL environment variable is set
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
