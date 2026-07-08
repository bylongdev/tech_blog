import session from "express-session";

import { prisma } from "@techblog/database/src/client.js";

import { env } from "../config/env.js";

function getExpiry(sessionData: session.SessionData) {
	const expiresAt = sessionData.cookie.expires;

	if (expiresAt instanceof Date) {
		return expiresAt;
	}

	if (typeof expiresAt === "string") {
		return new Date(expiresAt);
	}

	return new Date(Date.now() + env.SESSION_TTL_HOURS * 60 * 60 * 1000);
}

function serializeSession(sessionData: session.SessionData) {
	return JSON.stringify(sessionData);
}

function deserializeSession(payload: string) {
	return JSON.parse(payload) as session.SessionData;
}

export class PrismaSessionStore extends session.Store {
	override async get(
		sid: string,
		callback: (error: unknown, sessionData?: session.SessionData | null) => void,
	) {
		try {
			const storedSession = await prisma.authSession.findUnique({
				where: { sid },
			});

			if (!storedSession) {
				callback(null, null);
				return;
			}

			if (storedSession.expiresAt.getTime() <= Date.now()) {
				await prisma.authSession.delete({
					where: { sid },
				});
				callback(null, null);
				return;
			}

			callback(null, deserializeSession(storedSession.payload));
		} catch (error) {
			callback(error);
		}
	}

	override async set(
		sid: string,
		sessionData: session.SessionData,
		callback: (error?: unknown) => void = () => {},
	) {
		if (!sessionData.userId) {
			callback(new Error("Cannot persist a session without an authenticated user."));
			return;
		}

		try {
			const payload = serializeSession(sessionData);
			const expiresAt = getExpiry(sessionData);

			await prisma.authSession.upsert({
				where: { sid },
				update: {
					userId: sessionData.userId,
					payload,
					expiresAt,
				},
				create: {
					sid,
					userId: sessionData.userId,
					payload,
					expiresAt,
				},
			});

			callback();
		} catch (error) {
			callback(error);
		}
	}

	override async destroy(
		sid: string,
		callback: (error?: unknown) => void = () => {},
	) {
		try {
			await prisma.authSession.deleteMany({
				where: { sid },
			});
			callback();
		} catch (error) {
			callback(error);
		}
	}

	override async touch(
		sid: string,
		sessionData: session.SessionData,
		callback: (error?: unknown) => void = () => {},
	) {
		await this.set(sid, sessionData, callback);
	}
}
