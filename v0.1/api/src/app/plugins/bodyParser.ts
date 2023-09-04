import express, { Application } from 'express'

const mount = (app: Application) => {
	app.use(express.json(config.get('app.body')))
}

events.subscribe('expressBodyParser', app => mount(app as Application))
