import { connect } from 'amqplib'

export const startConsumer = async <T>(
	queue: string,
	consumer: (message: T) => void | Promise<void>
): Promise<void> => {
	const connection = await connect(config.get('core.amqp'))
	const channel = await connection.createChannel()
	await channel.assertQueue(queue, { durable: true })

	await channel.consume(queue, async message => {
		if (message) {
			let data: T | undefined
			try {
				data = JSON.parse(message.content.toString()) as T
				await consumer(data)
			} catch (err) {
				if (err instanceof Error) {
					const errorData = { queue, data, message: err.message, stack: err.stack }
					await produceMessage('consumerErrors', errorData)
				}
			}
			channel.ack(message)
		}
	})
}
