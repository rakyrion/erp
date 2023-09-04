import { Application } from 'express'
import cors from 'cors'

const mount = (app: Application) => {
	app.use(cors())
}

events.subscribe('expressPluginsBeforeBodyParser', app => mount(app as Application))
