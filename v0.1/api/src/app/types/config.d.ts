import '../../config/interfaces/configSchema'
import { Schema } from 'convict'

declare module '../../config/interfaces/configSchema' {
	export interface IConfigSchema {
		app: {
			host: Schema<string>,
			port: Schema<number>,
			baseUri: Schema<string>,
			body: {
				limit: Schema<number>
			},
			proxy: {
				level: Schema<number>
			}
		}
	}
}
