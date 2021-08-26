import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

import { 
    orderGetParamsSchem, 
    ordersGetByStatusParamsSchem, 
} from './schems';

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

export const getOrderParamsValidator = makeParamsValidator(orderGetParamsSchem);
export const getOrdersByStatusValidator = makeParamsValidator(ordersGetByStatusParamsSchem);