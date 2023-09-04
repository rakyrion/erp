import { IMessageBroker } from '../interfaces/messageBroker'
import { IMessageSubscriber } from '../interfaces/messageSubscriber'

export class MessageBroker implements IMessageBroker {
	private topics: Record<string, { subscriber: IMessageSubscriber, priority: number }[]> = {}

	public async publish(topic: string, ...data: unknown[]): Promise<void> {
		if (!this.topics[topic]) return
		const subscribers = this.topics[topic]
		const ordered = subscribers.some(sub => sub.priority !== 0)

		if (ordered) {
			const orderedSubscribers = subscribers.sort((a, b) => a.priority - b.priority)
			for (const sub of orderedSubscribers) {
				const result = sub.subscriber(...data)
				if (result instanceof Promise) await result
			}
		} else {
			const asyncSubscribers = subscribers
				.map(async sub => sub.subscriber(...data))
				.filter(sub => sub instanceof Promise)
			if (asyncSubscribers.length) await Promise.all(asyncSubscribers)
		}
	}

	public subscribe(topic: string, subscriber: IMessageSubscriber, priority: number = 0): void {
		if (!this.topics[topic]) this.topics[topic] = []
		this.topics[topic].push({ subscriber, priority })
	}

	public unsubscribe(topic: string, subscriber: IMessageSubscriber): void {
		if (!this.topics[topic]) return
		this.topics[topic] = this.topics[topic].filter(sub => sub.subscriber !== subscriber)
	}

	public clear(topic: string): void {
		if (this.topics[topic]) delete this.topics[topic]
	}
}
