import { SQSHandler } from 'aws-lambda';
import { updateOrder } from './order';

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
	return updateOrder(uuid, { status });
}