import { Schema } from 'convict'
import { IConfigSchema } from '../../config/interfaces/configSchema'
import { appConfigSchema } from './schema'

const merge = (configSchema: Schema<IConfigSchema>) => {
	configSchema.app = appConfigSchema
}

events.subscribe('configSchemaMerging', configSchema => merge(configSchema as Schema<IConfigSchema>))
