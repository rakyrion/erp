import { IErrorTranslation } from '../../../app/interfaces/errorTranslation'
import { DocumentNotFoundError } from '../documentNotFound'
import { NotFoundError } from '../../../app/errors/notFound'

const translate = (errorTranslation: IErrorTranslation) => {
	if (errorTranslation.original instanceof DocumentNotFoundError) {
		errorTranslation.translated = new NotFoundError('', undefined, { document: 'not found' })
	}
}

events.subscribe(
	'expressGlobalErrorHandlerTranslation',
	errorTranslation => translate(errorTranslation as IErrorTranslation)
)
