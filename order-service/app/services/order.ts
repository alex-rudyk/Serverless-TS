import { DynamoDB } from 'aws-sdk';
import { dynamoDbClient } from "../models";
import { OrderStatus, Order, OrderCreateAttributes } from "../models/order";

const { ORDERS_TABLE } = process.env;

export const getAllOrders = async () => {
    const params: DynamoDB.DocumentClient.ScanInput = {
        TableName: ORDERS_TABLE
    };

    return dynamoDbClient
        .scan(params)
        .promise()
        .then(result => { 
            const orders = result.Items as Order[];
            return orders;
        })
}

export const createNewOrder = async (order: OrderCreateAttributes) => {
    const orderToWrite: Order = {
        ...order,
        createdAt: Date.now(),
        updatedAt: Date.now(),
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