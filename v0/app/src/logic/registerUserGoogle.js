import {validateEmail } from 'validators'
const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL

function registerUserGoogle(name, lastName, email, googleId){
    //TODO INPUT VALIDATIONS -> name & lastName & googleId
    validateEmail(email)

    return (async() => {
        try{
            await axios.post(`${API_URL}/companies/google`,
            {name, lastName, email, googleId},
            {headers: {'Content-type' : 'application/json'}})

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

export default registerUserGoogle