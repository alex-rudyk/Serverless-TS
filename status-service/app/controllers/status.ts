import { Request, Response } from "express";

export const getOrdersByStatus = (req: Request, res: Response) => {
    const { status } = req.params;

    try {
        res.status(503).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not get orders' });
    } 
}

export const getOrderByUUID = (req: Request, res: Response) => {
    const { uuid } = req.params;

    try {
        res.status(503).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not get order' });
    } 
}