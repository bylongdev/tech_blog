import { Router } from "express";
import { authRouter } from "./auth.route.js";
import { healthRouter } from "./health.route.js";
import { adminRouter } from "./admin.route.js";

export const v1Router: Router = Router();

v1Router.use("/health", healthRouter);

v1Router.use("/auth", authRouter);
v1Router.use("/admin", adminRouter);
