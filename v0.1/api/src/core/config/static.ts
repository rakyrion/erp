import path from 'path'
import convict from 'convict'
import { coreConfigSchema } from './schema'

// Configuration schema
const configSchema = { core: coreConfigSchema }
const coreConfig = convict(configSchema)

// Folder /config
const configPath = path.join(__dirname, '../../../config')

// Load default configuration
try {
	coreConfig.loadFile(`${configPath}/config.json`)
} catch (err) { /* silence */ }

// Load environment configuration
try {
	coreConfig.loadFile(`${configPath}/config.${coreConfig.get('core.env')}.json`)
} catch (err) { /* silence */ }

// Validate loaded configuration
coreConfig.validate({ output: () => { /* silence */ } })

export { coreConfig }
