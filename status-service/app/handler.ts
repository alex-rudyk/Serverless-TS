import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import router from './routers';
import { sqsHandler } from './services/sqsHandler';

function createExpressApp(router: express.Router) {
	const app = express();

	app.use(express.json());
	app.use(cors());

	app.use(router);

	return app;
}

const statusService = createExpressApp(router);

export const status = serverless(statusService);
export const queueHandler = sqsHandler;