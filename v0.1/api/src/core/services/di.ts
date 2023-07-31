global.di = {}

events.subscribe('i18nLoaded', async () => {
	await events.publish('diSetup')
	void events.publish('diReady')
})

export {}
