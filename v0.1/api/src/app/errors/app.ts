import { EJsendStatus } from '../models/enumerations/jsendStatus'
import { OperationalError } from '../../core/errors/operational'

export abstract class AppError extends OperationalError {
	public status: EJsendStatus.FAIL | EJsendStatus.ERROR

	constructor(
		message: string,
		public statusCode: number,
		public errorCode?: number,
		public data?: Record<string, string | string[]>
	) {
		super(message)
		this.status = `${statusCode}`.startsWith('4') ? EJsendStatus.FAIL : EJsendStatus.ERROR
		Error.captureStackTrace(this, this.constructor)
	}
}
