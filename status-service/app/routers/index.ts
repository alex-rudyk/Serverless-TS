import { Router } from 'express';
import ordersRouter from './status';

const router = Router();

router.use('/status', ordersRouter);

export default router;
