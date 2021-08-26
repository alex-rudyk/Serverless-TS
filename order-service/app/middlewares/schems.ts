import joi from 'joi';
import { OrderStatus } from '../models/order';

export const orderCreateBodySchem: joi.ObjectSchema = joi.object().keys({
    uuid: joi.string().uuid().required(),
    name: joi.string().required(),
    amount: joi.number().required()
});

export const orderUpdateBodySchem: joi.ObjectSchema = joi.object().keys({
    name: joi.string().optional(),
    amount: joi.number().optional(),
    status: joi.string().valid(OrderStatus.Success, OrderStatus.InProgress, OrderStatus.Failed).optional()
});

export const orderUpdateParamsSchem: joi.ObjectSchema = joi.object().keys({
    uuid: joi.string().uuid().required()
});

export const orderGetParamsSchem: joi.ObjectSchema = orderUpdateParamsSchem;

export const orderDeleteParamsSchem: joi.ObjectSchema = orderUpdateParamsSchem;