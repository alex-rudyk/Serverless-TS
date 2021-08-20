import { Router } from 'express';
import { createNew, getOne } from '../controllers/orders';

const router = Router();

router.post('/', createNew);
router.get('/:uuid', getOne);

export default router;
