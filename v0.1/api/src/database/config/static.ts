import path from 'path'
import convict from 'convict'
import { databaseConfigSchema } from './schema'
import { coreConfig } from '../../core/config/static'

// Configuration schema
const configSchema = { database: databaseConfigSchema }
const databaseConfig = convict(configSchema)

// Folder /config
const configPath = path.join(__dirname, '../../../config')

// Load default configuration
try {
	databaseConfig.loadFile(`${configPath}/config.json`)
} catch (err) { /* silence */ }

// Load environment configuration
try {
	databaseConfig.loadFile(`${configPath}/config.${coreConfig.get('core.env')}.json`)
} catch (err) { /* silence */ }

// Validate loaded configuration
databaseConfig.validate({ output: () => { /* silence */ } })

export { databaseConfig }
