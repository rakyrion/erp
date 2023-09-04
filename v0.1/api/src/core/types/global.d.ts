/* eslint-disable no-var */

import { ILogger } from '../interfaces/logger'
import { IMessageBroker } from '../interfaces/messageBroker'
import { IDependencyInjector } from '../interfaces/dependencyInjector'

declare global {
	var log: ILogger
	var events: IMessageBroker
	var di: IDependencyInjector
	var produceMessage: (queue: string, data: unknown) => Promise<void>
}
