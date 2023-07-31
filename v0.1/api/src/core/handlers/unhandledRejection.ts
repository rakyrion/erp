import { Server } from 'http'

const setup = (server: Server) => {
	process.on('unhandledRejection', async (err: Error) => {
		log.error('Unhandled rejection encountered. Shutting down...', undefined, err)
		await log.exit()
		server.close(() => process.exit(1))
	})
}

events.subscribe('serverReady', server => setup(server as Server))
