import { Application } from 'express'
import compression from 'compression'

const mount = (app: Application) => {
	app.use(compression())
}

events.subscribe('expressPluginsAfterBodyParser', app => mount(app as Application))
