import { Request, Response } from "express";
import { createNewOrder, getAllOrders, getOrderWithUUID } from "../services/order";

export const createNew = async (req: Request, res: Response) => {
    const { uuid, name, amount } = req.body;

    const orderData = {
        uuid,
        name,
        amount
    }

    try {
        const successful = await createNewOrder(orderData);

        res.status(201).json({
            orderId: uuid,
            successful,
            type: 'create'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            orderId: uuid,
            successful: false,
            type: 'create',
            error: 'Could not create order'
        });
    }
}

export const getAll = async (_req: Request, res: Response) => {

    try {
        const orders = await getAllOrders();

        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not create order' });
    }
}

export const getOne = async (req: Request, res: Response) => {
    const { uuid } = req.params;

    try {
        const order = await getOrderWithUUID(uuid);

        if (!order) {
            res.status(404).json({ error: `Order with UUID: ${uuid} not found.` });
            return;
        }

        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not get order' });
    }
}