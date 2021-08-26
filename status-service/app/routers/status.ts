import { Router } from 'express';
import { getByUUID, getByStatus } from '../controllers/status';
import { getOrderParamsValidator, getOrdersByStatusValidator } from '../middlewares/validation';

const router = Router();

router.get('/:status', getOrdersByStatusValidator, getByStatus);
router.get('/order/:uuid', getOrderParamsValidator, getByUUID);

export default router;
