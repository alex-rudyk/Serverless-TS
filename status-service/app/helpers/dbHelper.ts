import { DynamoDB } from 'aws-sdk';

/**
 * Create Set UpdateParameters for dynamoDB.
 * 
 * @param {string} table table name.
 * @param {object} keys search keys.
 * @param {object} attr attributes to update.
 * @returns {DynamoDB.DocumentClient.UpdateItemInput} params
 * 
 * @example
 *  
 *  // Create params for updating order name to `Test` in the table `MY_TABLE_NAME` where order uuid is equal `dedc4bfa-e242-43c7-835c-9f32317585bc`.
 *  const params = createSetUpdateParams('MY_TABLE_NAME', { uuid: dedc4bfa-e242-43c7-835c-9f32317585bc }, { name: 'Test' });
 *  console.log(params); 
 *  
 * output: 
 * 
 *  {
 *      TableName: 'MY_TABLE_NAME',
 *      Key: {
 *          uuid: dedc4bfa-e242-43c7-835c-9f32317585bc
 *      },
 *      UpdateExpression: 'set #name = :name',
 *      ExpressionAttributeNames: {
 *          '#name': 'name'
 *      },
 *      ExpressionAttributeValues: {
 *          ':name': 'Test'
 *      }
 *  }
 */
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