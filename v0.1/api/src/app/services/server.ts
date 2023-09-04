import { Application } from 'express'

const run = (app: Application) => {
	const env = config.get('core.env')
	const host = config.get('app.host') || '0.0.0.0'
	const port = config.get('app.port') || 3000

	const server = app.listen(port, host, () => {
		log.http(`App running in ${env} mode on ${host}:${port}...`, 'app')
	})

	void events.publish('serverReady', server)
}

events.subscribe('expressReady', app => run(app as Application))
