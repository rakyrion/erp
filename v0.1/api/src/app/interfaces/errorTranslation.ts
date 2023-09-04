import { AppError } from '../errors/app'

export interface IErrorTranslation {
	original: unknown,
	translated?: AppError
}
