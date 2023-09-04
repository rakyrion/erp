import { Schema } from 'convict'
import { IConfigSchema } from '../../config/interfaces/configSchema'
import { databaseConfigSchema } from './schema'

const merge = (configSchema: Schema<IConfigSchema>) => {
	configSchema.database = databaseConfigSchema
}

events.subscribe('configSchemaMerging', configSchema => merge(configSchema as Schema<IConfigSchema>))
