import { ELogLevel } from '../models/enumerations/logLevel'

export interface ILogger {
	error(message: string, unit?: string, data?: unknown, filename?: string): void,
	warn(message: string, unit?: string, data?: unknown, filename?: string): void,
	info(message: string, unit?: string, data?: unknown, filename?: string): void,
	http(message: string, unit?: string, data?: unknown, filename?: string): void,
	verbose(message: string, unit?: string, data?: unknown, filename?: string): void,
	debug(message: string, unit?: string, data?: unknown, filename?: string): void,
	silly(message: string, unit?: string, data?: unknown, filename?: string): void,
	custom(message: string, filename: string, level?: ELogLevel, unit?: string, data?: unknown): void,
	exit(): Promise<void>
}
