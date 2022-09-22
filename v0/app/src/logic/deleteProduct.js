const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL

function deleteProduct(token, productId) {
    //TODO INPUT VALIDATIONS

    return (async () => {
        try {
            await axios({ method: 'DELETE', url: `${API_URL}/items/${productId}`, headers: { Authorization: `Bearer ${token}` } })

            return

        } catch (error) {
            const status = error.response.status
            if (status === 0) throw new Error('No response from server')
            const message = error.response.data.error
            if (status >= 500)
                throw new Error(`Server error (${status})`)
            else if (status >= 400)
                throw new Error(`Client error: ${message}`)

        }
    })()
}

export default deleteProduct