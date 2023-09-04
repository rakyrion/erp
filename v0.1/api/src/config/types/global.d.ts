import { Config } from 'convict'
import { IConfigSchema } from '../interfaces/configSchema'

declare global {
	// eslint-disable-next-line no-var
	var config: Config<IConfigSchema>
}
