import '../../config/interfaces/configSchema'
import { Schema } from 'convict'
import { EEnv } from '../models/enumerations/env'

declare module '../../config/interfaces/configSchema' {
	export interface IConfigSchema {
		core: {
			env: Schema<EEnv>,
			amqp: {
				protocol: Schema<string>,
				hostname: Schema<string>,
				port: Schema<number>,
				username: Schema<string>,
				password: Schema<string>,
				locale: Schema<string>,
				frameMax: Schema<number>,
				heartbeat: Schema<number>,
				vhost: Schema<string>
			},
			log: {
				console: {
					enable: Schema<boolean>,
					verbose: Schema<boolean>,
					debug: Schema<boolean>
				},
				system: {
					enable: Schema<boolean>,
					verbose: Schema<boolean>
				},
				debug: {
					enable: Schema<boolean>
				}
			}
		}
	}
}
