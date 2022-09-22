const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL

function createEstimate(token, estimateNumber, {customer, terms, estimateDate, products, totalAmount}){
    //TODO INPUT VALIDATIONS 
    if(!customer) throw new Error('Customer is required')
    if(!customer.billingAddress) throw new Error('Billing address is required')
    if(!terms) throw new Error('Terms is required')
    if (!estimateNumber) throw new Error('Estimate Number is required')
    if (!estimateDate) throw new Error('Estimate Date is required')

    return (async() => {
        try{
            await axios.post(`${API_URL}/estimates`,
            {estimateNumber, customer, terms, estimateDate, products, totalAmount},
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

export default createEstimate