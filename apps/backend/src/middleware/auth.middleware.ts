import type { NextFunction, Request, Response } from "express";

import { prisma } from "@techblog/database/src/client.js";

import type { AuthRole, AuthenticatedUser } from "../auth/auth.types.js";
import { endUserSession } from "../auth/session-auth.js";
import { HttpError } from "../lib/http-error.js";

function toAuthenticatedUser(user: {
	id: string;
	email: string;
	name: string | null;
	role: string;
}): AuthenticatedUser {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role as AuthRole,
	};
}

export async function requireAuth(
	request: Request,
	_response: Response,
	next: NextFunction,
) {
	try {
		if (!request.session.userId) {
			throw new HttpError(401, "Authentication required.");
		}

		const user = await prisma.user.findUnique({
			where: { id: request.session.userId },
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				isActive: true,
			},
		});

		if (!user) {
			await endUserSession(request);
			throw new HttpError(401, "Session is no longer valid.");
		}

		if (!user.isActive) {
			await endUserSession(request);
			throw new HttpError(403, "Your account has been disabled.");
		}

		request.currentUser = toAuthenticatedUser(user);
		next();
	} catch (error) {
		next(error);
	}
}

export function requireRole(...roles: AuthRole[]) {
	return (request: Request, _response: Response, next: NextFunction) => {
		if (!request.currentUser) {
			next(new HttpError(401, "Authentication required."));
			return;
		}

		if (!roles.includes(request.currentUser.role)) {
			next(new HttpError(403, "You are not allowed to access this resource."));
			return;
		}

		next();
	};
}
