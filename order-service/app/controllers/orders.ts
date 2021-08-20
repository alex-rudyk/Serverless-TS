import { Request, Response } from "express";
import { createNewOrder, getAllOrders } from "../services/order";

export const createNew = async (req: Request, res: Response) => {
    const { uuid, name, amount } = req.body;

    const orderData = {
        uuid,
        name,
        amount
    }

    try {
        await createNewOrder(orderData);

        res.status(100).json({
            orderId: uuid,
            successful: true,
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

export const getAll = async (req: Request, res: Response) => {

    try {
        const orders = await getAllOrders();

        res.status(200).json(orders);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not create order' });
    }
}