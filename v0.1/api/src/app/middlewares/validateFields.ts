import { ValidationError, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/badRequest'

const manageError = (err: ValidationError): string =>
	`${err.msg as string}${err.location ? ` (in ${err.location})` : ''}`

export const validateFields = reqCatch((req, res, next) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) return next()

	const data: Record<string, string | string[]> = {}
	errors.array().forEach(err => {
		const paramErrors = data[err.param]
		if (Array.isArray(paramErrors)) paramErrors.push(manageError(err))
		else if (data[err.param]) data[err.param] = [ paramErrors, manageError(err) ]
		else data[err.param] = manageError(err)
	})
	throw new BadRequestError('', undefined, data)
})
