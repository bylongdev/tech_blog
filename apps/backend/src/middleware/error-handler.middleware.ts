import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { HttpError } from "../lib/http-error.js";

export const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
	if (response.headersSent) {
		next(error);
		return;
	}

	if (error instanceof ZodError) {
		response.status(400).json({
			message: "Request validation failed.",
			issues: error.issues.map((issue) => ({
				path: issue.path.join("."),
				message: issue.message,
			})),
		});
		return;
	}

	if (error instanceof HttpError) {
		response.status(error.statusCode).json({
			message: error.message,
		});
		return;
	}

	console.error("Unhandled backend error:", error);
	response.status(500).json({
		message: "Internal server error.",
	});
};
