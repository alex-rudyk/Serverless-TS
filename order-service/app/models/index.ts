import { DynamoDB } from 'aws-sdk';

const createDBClient = () => {
    const dynamoDbClientParams: DynamoDB.Types.ClientConfiguration = {};

    if (process.env.IS_OFFLINE) {
        dynamoDbClientParams.region = 'localhost'
        dynamoDbClientParams.endpoint = 'http://localhost:8000'
    }

    return new DynamoDB.DocumentClient()
}

export const dynamoDbClient = createDBClient();