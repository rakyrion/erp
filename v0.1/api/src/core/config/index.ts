import { Schema } from 'convict'
import { IConfigSchema } from '../../config/interfaces/configSchema'
import { coreConfigSchema } from './schema'

const merge = (configSchema: Schema<IConfigSchema>) => {
	configSchema.core = coreConfigSchema
}

events.subscribe('configSchemaMerging', configSchema => merge(configSchema as Schema<IConfigSchema>))
