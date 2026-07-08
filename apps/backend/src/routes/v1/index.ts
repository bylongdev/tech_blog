import { Router } from "express";
import { authRouter } from "./auth/auth.route.js";
import { adminRouter } from "./auth/admin.route.js";
import { healthRouter } from "./health.route.js";
import { articlesRouter } from "./articles/index.js";

export const v1Router: Router = Router();

v1Router.use("/health", healthRouter);

v1Router.use("/auth", authRouter);
v1Router.use("/admin", adminRouter);

v1Router.use("/articles", articlesRouter);
