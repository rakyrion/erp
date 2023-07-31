export type IMessageSubscriber = (...data: unknown[]) => void | Promise<void>
