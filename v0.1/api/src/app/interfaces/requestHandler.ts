import { Request, Response, NextFunction } from 'express'

export type IRequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => void | Response | Promise<void | Response>
