const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL

function linkGoogleAccount(token, password, googleId){
    //TODO INPUT VALIDATIONS -> name & lastName & googleId

    return (async() => {
        try{
            await axios.post(`${API_URL}/users/google`,
            {password, googleId},
            {headers: 
                {'Content-type' : 'application/json', Authorization : `Bearer ${token}`},
            })

            return 

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

export default linkGoogleAccount