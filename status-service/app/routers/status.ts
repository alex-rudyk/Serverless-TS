import { Router } from 'express';

const router = Router();

router.use('/', (req, res) => {
    res.status(503).json({ message: 'Status service is not implemented yet!' })
});

export default router;
