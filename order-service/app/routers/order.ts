import { Router } from 'express';
import { createNew, deleteOne, getOne, update } from '../controllers/orders';

const router = Router();

router.post('/', createNew);
router.get('/:uuid', getOne);
router.put('/:uuid', update);
router.delete('/:uuid', deleteOne);

export default router;
