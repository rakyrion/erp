const { RegexError, AuthError, NotFoundError, DuplicityError, FormatError, NotFoundError404, BadRequestError, ForbiddenError } = require('errors')
const { JsonWebTokenError, TokenExpiredError, NotBeforeError } = require('jsonwebtoken')

async function runWithErrorHandling(callback, res, logger) {
    try {
        await callback()
    } catch (error) {
        if (error instanceof TypeError || error instanceof FormatError || error instanceof RegexError || error instanceof BadRequestError)
            res.status(400).json({ error: error.message })
        else if (error instanceof AuthError || error instanceof NotFoundError)
            res.status(401).json({ error: error.message })
        else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError || error instanceof NotBeforeError)
            res.status(401).json({ error: 'Token not valid' })
        else if(error instanceof ForbiddenError)
            res.status(403).json({error: error.message})
        else if (error instanceof NotFoundError404)
            res.status(404).json({ error: error.message })
        else if (error instanceof DuplicityError)
            res.status(409).json({ error: error.message })
        else res.status(500).json({ error: 'System error' })

        logger.error(error)

    }
}

module.exports = runWithErrorHandling

