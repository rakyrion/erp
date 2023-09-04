import { IRequestHandler } from '../interfaces/requestHandler'

global.reqCatch = (fn: IRequestHandler): IRequestHandler =>
	async (req, res, next) => {
		try {
			const result = fn(req, res, next)
			if (result instanceof Promise) await result
		} catch (err) {
			next(err)
		}
	}
