import { NotFoundError } from '../errors/notFound'

export const routeErrorHandler = reqCatch((req, res, next) => {
	throw new NotFoundError('', undefined, { route: 'not found' })
})
