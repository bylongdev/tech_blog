import { env } from "./config/env.js";
import { createApp } from "./app.js";

const app = createApp();

app.listen(env.BACKEND_PORT, () => {
	console.log(`Backend API listening on port ${env.BACKEND_PORT}`);
});
