import { Router } from 'express';
import { getByUUID, getByStatus } from '../controllers/status';

const router = Router();

router.get('/:status', getByStatus);
router.get('/order/:uuid', getByUUID);

export default router;
