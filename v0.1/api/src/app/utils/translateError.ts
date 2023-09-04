import { IErrorTranslation } from '../interfaces/errorTranslation'
import { AppError } from '../errors/app'
import { InternalServerError } from '../errors/internalServer'

export const translateError = async (err: unknown): Promise<AppError> => {
	// Already an AppError
	if (err instanceof AppError) return err
	
	const errorTranslation: IErrorTranslation = { original: err }
	await events.publish('expressGlobalErrorHandlerTranslation', errorTranslation)
	if (errorTranslation.translated) return errorTranslation.translated

	// Plain old JavaScript Error
	if (err instanceof Error) return new InternalServerError(err)

	// Not even an Error
	return new InternalServerError(new Error('Invalid thrown error.'))
}
