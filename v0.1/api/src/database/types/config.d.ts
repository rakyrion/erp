import '../../config/interfaces/configSchema'
import { Schema } from 'convict'

declare module '../../config/interfaces/configSchema' {
	export interface IConfigSchema {
		database: {
			connectionString: Schema<string>,
			protocol: Schema<string>,
			host: Schema<string>,
			username: Schema<string>,
			password: Schema<string>,
			name: Schema<string>,
			defaultPageSize: Schema<number>,
			updateProduction: Schema<boolean>,
			connection: {
				family: Schema<number>,
				poolSize: {
					min: Schema<number>,
					max: Schema<number>
				},
				ssl: Schema<boolean>,
				sslValidate: Schema<boolean>
			},
			schema: {
				minimize: Schema<boolean>,
				timestamps: Schema<boolean>,
				toJSON: {
					getters: Schema<boolean>,
					virtuals: Schema<boolean>,
					minimize: Schema<boolean>,
					versionKey: Schema<boolean>
				},
				toObject: {
					getters: Schema<boolean>,
					virtuals: Schema<boolean>,
					minimize: Schema<boolean>,
					versionKey: Schema<boolean>
				}
			}
		}
	}
}
