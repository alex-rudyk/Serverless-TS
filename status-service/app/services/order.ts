import { DynamoDB } from 'aws-sdk';
import { createSetUpdateParams } from '../helpers/dbHelper';
import { unixTimestampNow } from '../helpers/unixTimestamp';
import { dynamoDbClient } from "../models";
import { OrderStatus, Order, OrderUpdateAttributes } from "../models/order";

const { ORDERS_TABLE } = process.env;

export const getOrdersByStatus = async (status: OrderStatus) => {
    const params: DynamoDB.DocumentClient.ScanInput = {
        TableName: ORDERS_TABLE,
        FilterExpression: '#status = :status',
        ExpressionAttributeNames: {
            '#status': 'status'
        },
        ExpressionAttributeValues: {
            ':status': status
        }
    };

    return dynamoDbClient
        .scan(params)
        .promise()
        .then(result => { 
            if (result.Items)
                return result.Items as Order[];

            return [];
        })
}

export const getOrderByUUID = async (uuid: string) => {
    const params: DynamoDB.DocumentClient.GetItemInput = {
        TableName: ORDERS_TABLE,
        Key: {
            uuid
        }
    }

    return dynamoDbClient
        .get(params)
        .promise()
        .then(result => {
            if (result.Item)
                return result.Item as Order;

            return undefined;
        })
}

export const updateOrder = async (uuid: string, dataToUpdate: OrderUpdateAttributes) => {
    const data = {
        ...dataToUpdate,
        updatedAt: unixTimestampNow()
    }
    const params = {
        ...createSetUpdateParams(ORDERS_TABLE, { uuid }, data),
        ReturnValues: 'ALL_NEW'
    };

    return dynamoDbClient
        .update(params)
        .promise()
        .then(result => {
            if (result.Attributes)
                return result.Attributes as Order;
            
            return undefined;
        });
}