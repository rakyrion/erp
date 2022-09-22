import {validateEmail, validatePassword } from 'validators'
import {FormatError} from 'errors'
const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL

function registerUser(name, lastName, email, password, confirmPassword){
    //TODO INPUT VALIDATIONS -> name & lastName
    validateEmail(email)
    validatePassword(password)
    validatePassword(confirmPassword)
    if(password !== confirmPassword) throw new FormatError('Password and confirm password does not match')

    return (async() => {
        try{
            await axios.post(`${API_URL}/companies`,
            {name, lastName, email, password},
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

export default registerUser