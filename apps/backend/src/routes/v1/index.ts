import { Router } from "express";
import { articlesRouter } from "./articles/index.js";
import { sourcesRouter } from "./sources/index.js";
import { usersRouter } from "./users/index.js";

export const v1Router: Router = Router();

v1Router.use("/articles", articlesRouter);
v1Router.use("/sources", sourcesRouter);
v1Router.use("/users", usersRouter);
