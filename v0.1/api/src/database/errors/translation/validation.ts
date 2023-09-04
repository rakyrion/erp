import { IErrorTranslation } from '../../../app/interfaces/errorTranslation'
import { Error as MongooseError } from 'mongoose'
import { BadRequestError } from '../../../app/errors/badRequest'

const translate = (errorTranslation: IErrorTranslation) => {
	if (errorTranslation.original instanceof MongooseError.ValidationError) {
		const data = Object.fromEntries(
			Object.entries(errorTranslation.original.errors)
				.map(([ path, error ]) => [ path, error.message ])
		)
		errorTranslation.translated = new BadRequestError('', undefined, data)
	}
}

events.subscribe(
	'expressGlobalErrorHandlerTranslation',
	errorTranslation => translate(errorTranslation as IErrorTranslation)
)
