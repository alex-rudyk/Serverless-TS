import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

import { 
    orderCreateBodySchem, 
    orderDeleteParamsSchem, 
    orderGetParamsSchem, 
    orderUpdateBodySchem, 
    orderUpdateParamsSchem 
} from './schems';

const makeBodyValidator = (schem: joi.ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        const { error } = schem.validate(body);

        if (!error) {
            next();
            return;
        }

        res.status(400).json({ error: error.details[0].message });
    }
};

const makeParamsValidator = (schem: joi.ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { params } = req;
        const { error } = schem.validate(params);

        if (!error) {
            next();
            return;
        }

        res.status(400).json({ error: error.details[0].message });
    }
};

export const createOrderBodyValidator = makeBodyValidator(orderCreateBodySchem);
export const updateOrderBodyValidator = makeBodyValidator(orderUpdateBodySchem);
export const updateOrderParamsValidator = makeParamsValidator(orderUpdateParamsSchem);
export const getOrderParamsValidator = makeParamsValidator(orderGetParamsSchem);
export const deleteOrderParamsValidator = makeParamsValidator(orderDeleteParamsSchem);