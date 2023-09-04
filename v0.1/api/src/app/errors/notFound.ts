import { AppError } from './app'

export class NotFoundError extends AppError {
	constructor(
		message: string = '',
		errorCode?: number,
		data?: Record<string, string | string[]>
	) {
		super(message, 404, errorCode, data || { resource: 'not found' })
	}
}
