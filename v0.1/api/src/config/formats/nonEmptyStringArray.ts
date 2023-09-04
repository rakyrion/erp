import { addFormat } from 'convict'

export const nonEmptyStringArrayFormat = () => {
	addFormat({
		name: 'non-empty-string-array',
		validate: (value: string[]): void => {
			if (!Array.isArray(value) || !value.length) throw new Error('must be a non empty string array')
		}
	})
}

events.subscribe('configCustomFormatSetup', nonEmptyStringArrayFormat)
