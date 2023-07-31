import { connect } from 'amqplib'

global.produceMessage = async (queue: string, data: unknown): Promise<void> => {
	const message = JSON.stringify(data)

	const connection = await connect(config.get('core.amqp'))
	const channel = await connection.createChannel()
	await channel.assertQueue(queue, { durable: true })

	channel.sendToQueue(queue, Buffer.from(message), { persistent: true })
}
