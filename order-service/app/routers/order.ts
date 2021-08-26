import { Router } from 'express';
import { createNew, deleteOne, getOne, update } from '../controllers/orders';
import { 
    createOrderBodyValidator, 
    deleteOrderParamsValidator, 
    getOrderParamsValidator, 
    updateOrderBodyValidator, 
    updateOrderParamsValidator
} from '../middlewares/validation';

const router = Router();

router.post('/', createOrderBodyValidator, createNew);
router.get('/:uuid', getOrderParamsValidator, getOne);
router.put('/:uuid', updateOrderParamsValidator, updateOrderBodyValidator, update);
router.delete('/:uuid', deleteOrderParamsValidator, deleteOne);

export default router;
