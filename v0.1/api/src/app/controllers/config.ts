import { EJsendStatus } from '../models/enumerations/jsendStatus'

export const configController = reqCatch(async (req, res, next) => {
	await events.publish('appDynamicConfig')

	return res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: appConfig
	})
})
