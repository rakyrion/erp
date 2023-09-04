process.on('uncaughtException', async (err: Error) => {
	log.error('Uncaught exception throwed. Shutting down...', undefined, err)
	await log.exit()
	process.exit(1)
})

export {}
