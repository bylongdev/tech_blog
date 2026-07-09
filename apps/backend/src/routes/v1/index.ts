import { Router } from "express";
import { articlesRouter } from "./articles/index.js";

export const v1Router: Router = Router();

v1Router.use("/articles", articlesRouter);
