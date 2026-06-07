// clients/rss.client.ts
import Parser from "rss-parser";
import https from "https";

const parserClient = new Parser({
	requestOptions: {
		agent: new https.Agent({
			keepAlive: false,
		}),
	},
});

export default parserClient;
