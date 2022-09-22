const mongoose = require('mongoose')
const express = require('express')
const logger = require('./logger')(module)

require('dotenv').config()

const { env: { MONGO_URL, PORT } } = process

    ; (async () => {

        await mongoose.connect(MONGO_URL)
        logger.info(`Connected to DB: ${MONGO_URL}`)

        const api = express()

        const { usersRouter, companiesRouter, inventoryRouter, estimatesRouter, customersRouter, invoicesRouter } = require('./routes')

        api.use((_, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')

            next()
        })

        api.use('/api', usersRouter, companiesRouter, inventoryRouter, estimatesRouter, customersRouter, invoicesRouter)
        
        api.listen(PORT, () => { logger.info(`API started and listening port: ${PORT}`) })

        process.on('SIGINT', async () => {
            await mongoose.disconnect()
            logger.info('DB disconnected')
            process.exit(0)
        })
    })()