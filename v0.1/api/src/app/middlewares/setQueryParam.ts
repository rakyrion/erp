import { ParsedQs } from 'qs'

export const setQueryParam = (
	param: string,
	value: string | ParsedQs | string[] | ParsedQs[] | undefined = undefined
) => reqCatch((req, res, next) => {
	req.query[param] = value
	return next()
})
