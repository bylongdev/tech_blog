import { Router } from "express";
import { healthRouter } from "./health.route.js";
import { articlesRouter } from "./articles/index.js";

export const v2Router: Router = Router();

v2Router.get("/health", healthRouter);

v2Router.use("/articles", articlesRouter);
