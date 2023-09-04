export const copyParamToQuery = (
	param: string,
	nameInQuery?: string
) => reqCatch((req, res, next) => {
	req.query[nameInQuery || param] = req.params[param]
	return next()
})
