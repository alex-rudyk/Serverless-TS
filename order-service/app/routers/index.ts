import { Router } from 'express';
import orderRouter from './order';
import ordersRouter from './orders';

const router = Router();

router.use('/order', orderRouter);
router.use('/orders', ordersRouter);

export default router;
