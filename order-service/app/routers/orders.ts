import { Router } from 'express';
import { getAll } from '../controllers/orders';

const router = Router();

router.get('/', getAll);

export default router;
