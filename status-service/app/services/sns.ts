import  { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import config from "../config";

export const snsClient = new SNSClient({ region: config.region });

export const sendMessage = async (topic, message) => {
    const params = {
        Message: message,
        TopicArn: `arn:aws:sns:${config.region}:${config.accountId}:${topic}`
    }

    return snsClient.send(new PublishCommand(params));
}