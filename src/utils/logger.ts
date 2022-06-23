const winston = require('winston')
const path = require('path')

class Logger {
    level: string
    filename: string


    constructor(level = 'info', filename = 'logger.log') {
        this.level = level,
        this.filename = filename
    }
    create() {
        const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}:${message}`
        })

        const filename = path.resolve(path.join('logs', this.filename))

        const logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.label({
                    label: 'SocketChat'
                }),
                winston.format.timestamp(),
                logFormat
            ),
            level: this.level,
            transports: [new winston.transports.File({
                filename,
                level: this.level
            })]
        })

        return logger
    }

}

const queryLogger = new Logger('info', 'query.log').create()
const errorLogger = new Logger('error', 'errors.log').create()
const validationErrorLogger = new Logger('error', 'validation_errors.log').create()
const authErrorLogger = new Logger('error', 'auth_errors.log').create()

//todo authErrorLogger.error(`${req.originalUrl} ${req.ip} ${token}`)
//todo validationErrorLogger.error(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`)
//todo queryLogger.log('info',`${req.protocol} ${req.method} ${req.originalUrl} ${req.sessionID} ${req.ip}`)


export {
    queryLogger,
    errorLogger,
    validationErrorLogger,
    authErrorLogger
}