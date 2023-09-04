import { addFormat } from 'convict'
import isEmail from 'validator/lib/isEmail'

export const emailFormat = () => {
	addFormat({
		name: 'email',
		validate: (value: string): void => {
			if (!isEmail(value)) throw new Error('must be an email address')
		}
	})
}

events.subscribe('configCustomFormatSetup', emailFormat)
