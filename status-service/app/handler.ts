import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import router from './routers/status';

function createExpressApp(router: express.Router) {
	const app = express();

	app.use(express.json());
	app.use(cors());

	app.use(router);

	return app;
}

const statusService = createExpressApp(router);

export const orders = serverless(statusService);