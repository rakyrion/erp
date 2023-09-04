/* eslint-disable no-var */

import { IAppConfig } from '../interfaces/appConfig'
import { IRequestHandler } from '../interfaces/requestHandler'

declare global {
	var appConfig: IAppConfig
	var reqCatch: (fn: IRequestHandler) => IRequestHandler
}
