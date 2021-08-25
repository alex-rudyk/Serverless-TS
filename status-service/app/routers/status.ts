import { Router } from 'express';
import { getOrderByUUID, getOrdersByStatus } from '../controllers/status';

const router = Router();

router.get('/:status', getOrdersByStatus);
router.get('/order/:uuid', getOrderByUUID);

export default router;
