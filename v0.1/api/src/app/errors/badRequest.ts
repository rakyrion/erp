import { AppError } from './app'

export class BadRequestError extends AppError {
	constructor(
		message: string = '',
		errorCode?: number,
		data?: Record<string, string | string[]>
	) {
		super(message, 400, errorCode, data)
	}
}
