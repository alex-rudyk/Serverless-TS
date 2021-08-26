import { SQSHandler } from 'aws-lambda';
import { getOrderByUUID, updateOrder } from './order';
import { sendMessage } from './sns';

const { TOPIC_NAME } = process.env;

export const sqsHandler: SQSHandler = async (event) => {
	try {
		for (const record of event.Records) {
			const data = JSON.parse(record.body);

			await handleUpdateStatus(data);
		}
	} catch (error) {
		console.log(error);
	}
};

const handleUpdateStatus = async ({ uuid, status }) => {
	const order = await getOrderByUUID(uuid);

	if (!order)
		return;

	await sendMessage(TOPIC_NAME, `Order status updated:\n - Order name: ${order.name}\n - Order amount: ${order.amount}\n - New status: ${status}`);

	return updateOrder(uuid, { status });
}