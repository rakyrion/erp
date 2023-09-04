import { AppError } from './app'

export class ForbiddenError extends AppError {
	constructor(
		message: string = '',
		errorCode?: number,
		data?: Record<string, string | string[]>
	) {
		super(message, 403, errorCode, data || { resource: 'forbidden' })
	}
}
