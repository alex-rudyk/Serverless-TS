import { Router } from 'express';

const router = Router();

router.use('/', (req, res) => {
    res.status(503).json({ message: 'Order service is not implemented yet!' })
});

export default router;
