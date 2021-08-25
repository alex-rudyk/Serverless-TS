import { DynamoDB } from 'aws-sdk';

export const createSetUpdateParams = (table: string, keys: object, attr: object) => {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: table,
        Key: {
            ...keys
        }
    };

    params.UpdateExpression = 'set';
    params.ExpressionAttributeNames = {};
    params.ExpressionAttributeValues = {};

    for (const property in attr) {
        if (!attr[property])
            continue;

        params.UpdateExpression += ` #${property} = :${property} ,`;
        params.ExpressionAttributeNames['#' + property] = property;
        params.ExpressionAttributeValues[':' + property] = attr[property];
    }

    params.UpdateExpression = params.UpdateExpression.slice(0, -1);

    return params;
}