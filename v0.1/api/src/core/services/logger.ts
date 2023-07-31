import util from 'util'
import winston from 'winston'
import { ILogger } from '../interfaces/logger'
import { ELogLevel } from '../models/enumerations/logLevel'
import { coreConfig } from '../config/static'

class Logger implements ILogger {
	protected loggers: Record<string, winston.Logger>
	
	constructor() {
		const { console, system, debug } = coreConfig.get('core.log')

		this.loggers = {
			// System logger
			'system.log': winston.createLogger({
				levels: winston.config.npm.levels,
				level: ELogLevel.VERBOSE,
				exitOnError: false,
				transports: [
					...console.enable ?
						[new winston.transports.Console({
							level: console.verbose ? ELogLevel.VERBOSE : ELogLevel.HTTP,
							format: this.customLogFormat(true),
							handleExceptions: false
						})] :
						[],
					...system.enable ?
						[new winston.transports.File({
							level: system.verbose ? ELogLevel.VERBOSE : ELogLevel.HTTP,
							format: this.customLogFormat(),
							dirname: 'logs',
							filename: 'system.log',
							handleExceptions: false
						})] :
						[]
				]
			}),

			// Debug logger
			'debug.log': winston.createLogger({
				levels: winston.config.npm.levels,
				level: ELogLevel.DEBUG,
				exitOnError: false,
				transports: [
					...console.enable && console.debug ?
						[new winston.transports.Console({
							level: ELogLevel.DEBUG,
							format: this.customLogFormat(true),
							handleExceptions: false
						})] :
						[],
					...debug.enable ?
						[new winston.transports.File({
							level: ELogLevel.DEBUG,
							format: this.customLogFormat(),
							dirname: 'logs',
							filename: 'debug.log',
							handleExceptions: false
						})] :
						[]
				]
			})
		}
	}

	public error(message: string, unit?: string, data?: unknown, filename?: string): void {
		this.getLogger(filename || 'system.log').error({ message, unit, data })
	}

	public warn(message: string, unit?: string, data?: unknown, filename?: string): void {
		this.getLogger(filename || 'system.log').warn({ message, unit, data })
	}

	public info(message: string, unit?: string, data?: unknown, filename?: string): void {
		this.getLogger(filename || 'system.log').info({ message, unit, data })
	}

	public http(message: string, unit?: string, data?: unknown, filename?: string): void {
		this.getLogger(filename || 'system.log').http({ message, unit, data })
	}

	public verbose(message: string, unit?: string, data?: unknown, filename?: string): void {
		this.getLogger(filename || 'system.log').verbose({ message, unit, data })
	}

	public debug(message: string, unit?: string, data?: unknown, filename?: string): void {
		this.getLogger(filename || 'debug.log').debug({ message, unit, data })
	}

	public silly(message: string, unit?: string, data?: unknown, filename?: string): void {
		if (!filename) return
		this.getLogger(filename).silly({ message, unit, data })
	}

	public custom(
		message: string,
		filename: string,
		level: ELogLevel = ELogLevel.VERBOSE,
		unit?: string,
		data?: unknown
	): void {
		this[level](message, unit, data, filename)
	}

	public async exit(): Promise<void> {
		const { loggers } = this

		const promises = Object.values(loggers).map(async logger => {
			const promise = new Promise<void>(resolve => {
				logger.on('finish', resolve)
			})

			logger.end()

			return promise
		})

		await Promise.all(promises)
	}

	protected getLogger(filename: string): winston.Logger {
		if (typeof this.loggers[filename] === 'undefined') {
			this.loggers[filename] = winston.createLogger({
				levels: winston.config.npm.levels,
				level: ELogLevel.SILLY,
				exitOnError: false,
				transports: [
					new winston.transports.File({
						level: ELogLevel.SILLY,
						format: this.customLogFormat(),
						dirname: 'logs',
						filename,
						handleExceptions: false
					})
				]
			})
		}

		return this.loggers[filename]
	}

	protected customLogFormat(colorize: boolean = false): winston.Logform.Format {
		const formats: winston.Logform.Format[] = [
			winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			winston.format.printf(({ timestamp, unit, level, message, data }) => {
				const parsedUnit = unit ? `${(unit as string).toLowerCase().replaceAll(' ', '_')}` : 'main'
				const parsedLevel = level.toUpperCase()
				const parsedData = data ? ` [${util.inspect(data, false, null)}]` : ''
				return `[${timestamp as string}] ${parsedUnit}.${parsedLevel}: ${message as string}${parsedData}`
			})
		]

		if (colorize) formats.push(winston.format.colorize({ all: true }))

		return winston.format.combine(...formats)
	}
}

global.log = new Logger()
