import { isIP } from 'net'
import { addFormat } from 'convict'

export const ipAddressFormat = () => {
	addFormat({
		name: 'ip-address',
		validate: (value: string): void => {
			if (!isIP(value)) throw new Error('must be an IP address')
		}
	})
}

events.subscribe('configCustomFormatSetup', ipAddressFormat)
