import { SQS } from 'aws-sdk';
import config from '../config';

const sqs = new SQS();

export const sendMessage = (queueName, data) => {
    const region = config.region;
    const accountId = config.accountId;

    const queueUrl: string = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`

    return sqs.sendMessage({
        QueueUrl: queueUrl,
        MessageBody: data,
        MessageAttributes: {},
      }).promise();
}