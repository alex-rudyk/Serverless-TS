import { Request, Response } from "express";
import { OrderStatus } from "../models/order";
import { badQuantityFunction } from "../services/failure";
import { createNewOrder, deleteOrder, getAllOrders, getOrderWithUUID, sendOrderUpdateStatus, updateOrder } from "../services/order";

export const createNew = async (req: Request, res: Response) => {
    const { uuid, name, amount } = req.body;

    const orderData = {
        uuid,
        name,
        amount
    }

    try {
        const successful = await createNewOrder(orderData);

        badQuantityFunction(async (success) => {
            const newStatus = success ? OrderStatus.Success : OrderStatus.Failed;

            await sendOrderUpdateStatus(uuid, newStatus);
        });

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

export const update = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const { name, amount } = req.body;

    try {
        const order = await getOrderWithUUID(uuid);

        if (!order) {
            res.status(404).json({
                orderId: uuid,
                successful: false,
                type: 'update',
                error: `Order with UUID: ${uuid} not found.` 
            });
            return;
        }

        const isSuccess = badQuantityFunction(async (success) => {
            if (success)
                await updateOrder(uuid, {
                    name,
                    amount: parseInt(amount)
                });
        });

        res.status(200).json({
            orderId: uuid,
            successful: isSuccess,
            type: 'update'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            orderId: uuid,
            successful: false,
            type: 'update',
            error: 'Could not update order'
        });
    }
}

export const deleteOne = async (req: Request, res: Response) => {
    const { uuid } = req.params;

    try {
        const order = await getOrderWithUUID(uuid);

        if (!order) {
            res.status(404).json({
                orderId: uuid,
                successful: false,
                type: 'delete',
                error: `Order with UUID: ${uuid} not found.` 
            });
            return;
        }

        const isSuccess = badQuantityFunction(async (success) => {
            if (success)
                await deleteOrder(uuid);
        })

        res.status(200).json({
            orderId: uuid,
            successful: isSuccess,
            type: 'delete'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            orderId: uuid,
            successful: false,
            type: 'delete',
            error: 'Could not delete order'
        });
    }
}