import { AppError } from './app'

export class InternalServerError extends AppError {
	public originalError: {
		name?: string,
		message?: string,
		stack?: string
	} = {}

	constructor(
		originalError: Error | undefined = undefined,
		message: string = 'Something went wrong.',
		errorCode?: number,
		data?: Record<string, string | string[]>
	) {
		super(message, 500, errorCode, data)
		this.originalError.name = originalError?.name
		this.originalError.message = originalError?.message
		this.originalError.stack = originalError?.stack
	}
}
