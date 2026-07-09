import { Router } from "express";
import { v1Router } from "./v1/index.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { healthRouter } from "./v1/health.route.js";

export const apiRouter: Router = Router();

apiRouter.use("/health", healthRouter);

apiRouter.use("/v1", requireAuth, requireRole("ADMIN"), v1Router);
