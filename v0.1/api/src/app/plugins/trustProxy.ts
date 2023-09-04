import { Application } from 'express'

const mount = (app: Application) => {
	const proxyLevel = config.get('app.proxy.level')
	if (proxyLevel) app.set('trust proxy', proxyLevel)
}

events.subscribe('expressPluginsBeforeBodyParser', app => mount(app as Application))
