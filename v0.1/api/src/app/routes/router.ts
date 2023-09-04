import express, { Router } from 'express'
import { configRoute } from './config'

const mount = async (appRouter: Router) => {
	const router = express.Router()
	
	await events.publish('appStaticConfig')

	router.get('/config', ...configRoute())

	appRouter.use('/app', router)
}

events.subscribe('expressRoutes', async appRouter => mount(appRouter as Router))
