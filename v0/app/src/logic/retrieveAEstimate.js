const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL

function retrieveAEstimate(token, estimateId) {
    //TODO INPUT VALIDATIONS

    return (async () => {
        try {
            const response = await axios({ method: 'GET', url: `${API_URL}/estimates/${estimateId}`, headers: { Authorization: `Bearer ${token}` } })

            //SANITIZE DATE FORMAT
            const date = new Date(response.data.estimateDate)

            function sanitizeDate(date) {
                let month = date.getMonth() + 1
                if (month < 10) month = '0' + month

                let day = date.getDate()
                if (day < 10) day = '0' + day
                let year = date.getFullYear()

                return year + '-' + month + '-' + day
            }
            const dateModified = sanitizeDate(date)
            response.data.estimateDate = dateModified

            return response.data



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

export default retrieveAEstimate