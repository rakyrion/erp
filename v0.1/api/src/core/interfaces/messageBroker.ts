import { IMessageSubscriber } from './messageSubscriber'

export interface IMessageBroker {
	publish(topic: string, ...data: unknown[]): Promise<void>,
	subscribe(topic: string, subscriber: IMessageSubscriber, priority?: number): void,
	unsubscribe(topic: string, subscriber: IMessageSubscriber): void,
	clear(topic: string): void
}
