import { EJsendStatus } from '../models/enumerations/jsendStatus'

export interface IErrorResponse {
	status: EJsendStatus.FAIL | EJsendStatus.ERROR,
	message?: string,
	code?: number,
	data?: Record<string, string | string[]>,
	_additional?: {
		error: Error,
		message: string,
		stack?: string
	}
}
