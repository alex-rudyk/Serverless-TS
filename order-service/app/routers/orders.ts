import { Router } from 'express';

const router = Router();

router.use('/', (req, res) => {
    res.status(503).json({ message: 'Orders service is not implemented yet!' })
});

export default router;
