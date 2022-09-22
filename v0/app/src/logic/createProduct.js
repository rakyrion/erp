import {BadRequestError} from 'errors'
const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL

function createProduct(token, name, sku, {category, description, cost, initStock, minStock}){
    //TODO INPUT VALIDATIONS 
   if(!name) throw new BadRequestError('Product name is required')
   if(!sku) throw new BadRequestError('SKU is required')

    return (async() => {
        try{
            await axios.post(`${API_URL}/items`,
            {name, sku, category, description, cost, initStock, minStock },
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

export default createProduct