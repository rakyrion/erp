import {validateEmail, validatePassword } from 'validators'
const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL

function authenticateUser(email, password){
    //TODO INPUT VALIDATIONS
    validateEmail(email)
    validatePassword(password)

    return (async() => {
        try{
            const response = await axios.post(`${API_URL}/users/auth`,
            {email, password},
            {headers: {'Content-type' : 'application/json'}})

            const {data : {token}} = response
            return token

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

export default authenticateUser