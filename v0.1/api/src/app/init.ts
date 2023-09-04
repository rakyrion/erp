import express, { Application } from 'express'
import { routeErrorHandler } from './handlers/routeError'
import { globalErrorHandler } from './handlers/globalError'

events.subscribe('diReady', async () => {
	const app: Application = express()
	const appBaseUri = `${config.get('app.baseUri')}/:apiVersion`

	// Plugins to be executed before body parser
	await events.publish('expressPluginsBeforeBodyParser', app)

	// Routes that need raw body
	const routerBeforeBodyParser = express.Router()
	await events.publish('expressRoutesBeforeBodyParser', routerBeforeBodyParser)
	app.use(appBaseUri, routerBeforeBodyParser)
	
	// Body parser
	await events.publish('expressBodyParser', app)

	// Passport strategies
	await events.publish('passportStrategies', app)
	
	// Plugins to be executed after body parser
	await events.publish('expressPluginsAfterBodyParser', app)
	
	// Routes
	const router = express.Router()
	await events.publish('expressRoutes', router)
	app.use(appBaseUri, router)
	
	// Route error handler
	app.all('*', routeErrorHandler)
	
	// Global error handler
	app.use(globalErrorHandler)

	void events.publish('expressReady', app)
})

void events.publish('applicationStart')
