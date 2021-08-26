import { DynamoDB } from 'aws-sdk';
import { createSetUpdateParams } from '../helpers/dbHelper';
import { unixTimestampNow } from '../helpers/unixTimestamp';
import { dynamoDbClient } from "../models";
import { OrderStatus, Order, OrderCreateAttributes, OrderUpdateAttributes } from "../models/order";
import { sendMessage } from './sqs';

const { ORDERS_TABLE, ORDERS_QUEUE } = process.env;

export const getAllOrders = async () => {
    const params: DynamoDB.DocumentClient.ScanInput = {
        TableName: ORDERS_TABLE
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

export const getOrderWithUUID = async (uuid: string) => {
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

export const createNewOrder = async (order: OrderCreateAttributes) => {
    const orderToWrite: Order = {
        ...order,
        createdAt: unixTimestampNow(),
        updatedAt: unixTimestampNow(),
        status: OrderStatus.InProgress
    };

    const params: DynamoDB.DocumentClient.PutItemInput = {
        TableName: ORDERS_TABLE,
        Item: {
            ...orderToWrite
        }
    }

    return dynamoDbClient
        .put(params)
        .promise()
        .then(result => { 
            return !!result.$response.data;
        });
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

export const deleteOrder = async (uuid: string) => {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
        TableName: ORDERS_TABLE,
        Key: {
            uuid
        }
    };

    return dynamoDbClient
        .delete(params)
        .promise()
        .then(result => {
            return !!result.$response.data;
        });
}

export const sendOrderUpdateStatus = async (uuid: string, status: OrderStatus) => {
    return sendMessage(ORDERS_QUEUE, JSON.stringify({
        uuid,
        status
    }));
}