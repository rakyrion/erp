const { Estimate , Company, Customer, InventoryItem } = require('../../models')
const { Types: { ObjectId } } = require('mongoose');
const { DuplicityError, NotFoundError, FormatError } = require('errors');

function createEstimate(company, estimateNumber, customer, terms, estimateDate, products, totalAmount, status = 'pending'){
    //TODO Validate Inputs
    if (!(ObjectId.isValid(company))) throw new FormatError('Company ID is not valid');

    return (async() => {
        const companyFound = await Company.findById(company)
        if (!companyFound) throw new NotFoundError(`Company with ID ${company} not found`)

        const estimateFound = await Estimate.findOne({company, estimateNumber})
        if(estimateFound) throw new DuplicityError(`There's already an estimate with number ${estimateNumber}`)

        const customerFound = await Customer.findOne({company, _id : customer.refId})
        if (!customerFound) throw new NotFoundError(`Customer with ID ${customer.refId} not found`)

        const productIds = products.map(({id}) => id)
        // Destructuring del ID de cada objeto del array products. De esta manera conseguimos un array con IDs para manejarlo directamente, ya que la busqueda se hara solo con esa propiedad, ejem -> ['123123', '12312312', ...]

        const itemsFound = await InventoryItem.find({ _id: {  $in: productIds}}).lean()
        // Buscamos TODOS los items que en la propiedad _id contengan alguno de los Ids ($in) del array productIds
        // De esta manera no nos detecta si alguno NO lo encuentra, por lo que realizamos la comprobacion con el siguiente codigo:

        if (itemsFound.length !== productIds.length) {
            const foundIds = itemsFound.map(item => item._id.toString())

            const notFoundIds = productIds.filter(productId => !foundIds.includes(productId))

            throw new NotFoundError(`items with ids ${notFoundIds} not found`)
        }
        // Primero comprobamos que el length sea distinto, lo que significará que algun item no lo ha encontrado, o que ha encontrado 2 items con el mismo ID (no deberia pasar)
        // de los documentos itemsFound hacemos map para quedarnos solo con el id
        // hacemos un filter para comprobar en el array de TODOS los IDs, si alguno de estos NO SE INCLUYE en el array de ENCONTRADOS(foundIds)
        
        return await Estimate.create({company, estimateNumber, customer, terms, estimateDate , products, totalAmount, status})
    })()
}

module.exports = createEstimate