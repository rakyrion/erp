import { Request, Response, NextFunction } from 'express'
import { IErrorResponse } from '../interfaces/errorResponse'
import { EEnv } from '../../core/models/enumerations/env'
import { translateError } from '../utils/translateError'

export const globalErrorHandler = async (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	// Error translation
	const error = await translateError(err)

	// Error response construction
	const { statusCode, status, message, errorCode, data } = error
	const errorData: IErrorResponse = { status, message: message || undefined, code: errorCode, data }

	// Error response additional data
	if (config.get('core.env') !== EEnv.PRODUCTION) {
		errorData._additional = {
			error,
			message: error.message,
			stack: error.stack
		}
	}

	res.status(statusCode).json(errorData)
}
