import joi from 'joi';
import { OrderStatus } from '../models/order';

export const orderGetParamsSchem: joi.ObjectSchema = joi.object().keys({
    uuid: joi.string().uuid().required()
});

export const ordersGetByStatusParamsSchem: joi.ObjectSchema = joi.object().keys({
    status: joi.string().valid(OrderStatus.Success, OrderStatus.InProgress, OrderStatus.Failed).required()
});