export const authRoles = ["ADMIN", "USER"] as const;

export type AuthRole = (typeof authRoles)[number];

export interface AuthenticatedUser {
	id: string;
	email: string;
	name: string | null;
	role: AuthRole;
}
