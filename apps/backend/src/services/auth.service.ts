import { compare, hash } from "bcryptjs";

import { prisma } from "@techblog/database/src/client.js";

import type { AuthenticatedUser } from "../auth/auth.types.js";
import type { LoginInput, RegisterInput } from "../auth/auth.schema.js";
import { HttpError } from "../lib/http-error.js";

const PASSWORD_SALT_ROUNDS = 12;

export class AuthService {
	async register(input: RegisterInput): Promise<AuthenticatedUser> {
		const existingUser = await prisma.user.findUnique({
			where: {
				email: input.email,
			},
		});

		if (existingUser) {
			throw new HttpError(409, "An account with this email already exists.");
		}

		const role = (await prisma.user.count()) === 0 ? "ADMIN" : "USER";
		const passwordHash = await hash(input.password, PASSWORD_SALT_ROUNDS);

		const user = await prisma.user.create({
			data: {
				email: input.email,
				name: input.name ?? null,
				passwordHash,
				role,
			},
		});

		return this.toAuthenticatedUser(user);
	}

	async login(input: LoginInput): Promise<AuthenticatedUser> {
		const user = await prisma.user.findUnique({
			where: {
				email: input.email,
			},
		});

		if (!user) {
			throw new HttpError(401, "Invalid email or password.");
		}

		if (!user.isActive) {
			throw new HttpError(403, "Your account has been disabled.");
		}

		const passwordMatches = await compare(input.password, user.passwordHash);

		if (!passwordMatches) {
			throw new HttpError(401, "Invalid email or password.");
		}

		return this.toAuthenticatedUser(user);
	}

	private toAuthenticatedUser(user: {
		id: string;
		email: string;
		name: string | null;
		role: string;
	}): AuthenticatedUser {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role as AuthenticatedUser["role"],
		};
	}
}
