const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, label } = format

function createLabelForModule(callingModule) {
    const parts = callingModule.filename.split('/')

    return parts[parts.length - 2] + '/' + parts.pop()
}

module.exports = function (callingModule) {
    return createLogger({
        level: 'debug',
        format: combine(
            timestamp(),
            label({ label: createLabelForModule(callingModule) }),
            printf(log => `${log.level.toUpperCase()} ${log.timestamp} ${log.label} | ${log.message}`)
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'server.log' }),
        ],
    })
}