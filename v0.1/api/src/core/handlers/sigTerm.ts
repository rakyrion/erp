import { Server } from 'http'

const setup = (server: Server) => {
	process.on('SIGTERM', async () => {
		log.warn('SIGTERM received. Shutting down...')
		await log.exit()
		server.close()
	})
}

events.subscribe('serverReady', server => setup(server as Server))
