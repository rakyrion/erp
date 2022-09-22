const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL

function retrieveEstimates(token){
    //TODO INPUT VALIDATIONS
    return (async() => {
        try{
            const response = await axios({method: 'GET', url: `${API_URL}/estimates`, headers: {Authorization : `Bearer ${token}`} })
            
            //SANITIZE DATE FORMAT
            response.data.forEach(estimate => {
                let date = new Date(estimate.estimateDate)
                let dateModified = new Intl.DateTimeFormat('en-GB').format(date)
                estimate.estimateDate = dateModified
            })
            
            return response.data

        }catch(error){
            const status = error.response.status
            if(status === 0) throw new Error('No response from server')
            const message = error.response.data.error
            if(status >=500)
                throw new Error(`Server error (${status})`)
            else if(status >=400)
                throw new Error(`Client error: ${message}`)
            
        }
    })() 
}

export default retrieveEstimates