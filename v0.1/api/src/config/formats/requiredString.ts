import { addFormat } from 'convict'

export const requiredStringFormat = () => {
	addFormat({
		name: 'required-string',
		validate: (value: string): void => {
			if (typeof value !== 'string') throw new Error('must be a string')
			if (!value.length) throw new Error('must be a non-empty string')
		}
	})
}

events.subscribe('configCustomFormatSetup', requiredStringFormat)
