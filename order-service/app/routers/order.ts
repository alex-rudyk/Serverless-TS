import { Router } from 'express';
import { createNew } from '../controllers/orders';

const router = Router();

router.post('/', createNew);

export default router;
