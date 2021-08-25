import { Request, Response } from "express";
import { OrderStatus } from "../models/order";
import { getOrderByUUID, getOrdersByStatus } from "../services/order";

export const getByStatus = async (req: Request, res: Response) => {
    const { status } = req.params;

    try {
        if (status as OrderStatus) {
            const orders = await getOrdersByStatus(status as OrderStatus);

            res.status(200).json(orders);
        } else {
            res.status(400).json({ error: `Invalid order status: ${status}` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not get orders' });
    } 
}

export const getByUUID = async (req: Request, res: Response) => {
    const { uuid } = req.params;

    try {
        const order = await getOrderByUUID(uuid);

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: `Order with UUID: ${uuid} not found.` });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not get order' });
    } 
}