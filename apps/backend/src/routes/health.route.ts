import { Router, type Router as ExpressRouter } from "express";

export const healthRouter: ExpressRouter = Router();

healthRouter.get("/", (_request, response) => {
	response.status(200).json({
		status: "ok",
	});
});
