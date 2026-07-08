import type { Request } from "express";

export async function beginUserSession(request: Request, userId: string) {
	await new Promise<void>((resolve, reject) => {
		request.session.regenerate((error) => {
			if (error) {
				reject(error);
				return;
			}

			request.session.userId = userId;
			request.session.save((saveError) => {
				if (saveError) {
					reject(saveError);
					return;
				}

				resolve();
			});
		});
	});
}

export async function endUserSession(request: Request) {
	await new Promise<void>((resolve, reject) => {
		request.session.destroy((error) => {
			if (error) {
				reject(error);
				return;
			}

			resolve();
		});
	});
}
