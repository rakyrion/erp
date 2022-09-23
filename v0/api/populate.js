const mongoose = require('mongoose')
const { Company, User, InventoryItem, Customer, Estimate, Invoice } = require('./models')
const { invoices: { createInvoice } } = require('./logic')
require('dotenv').config()
const { env: { MONGO_URL } } = process

    ; (async () => {

        await mongoose.connect(MONGO_URL)

        await Promise.all([Company.deleteMany(), User.deleteMany(), InventoryItem.deleteMany(), Customer.deleteMany(), Estimate.deleteMany(), Invoice.deleteMany()])

        const newCompany = {
            name: "Adrian's Company",
            legalName: "Adrian S.L",
            legalId: "123123123B",
            companyEmail: "12@12.com",
            telephone: 666555444,
            companyEmail: '12@12.com',
            postalAddress: {
                street: 'Populated company Street',
                town: 'Populated Town',
                state: 'Populated state',
                zipCode: 'Populated zipCode',
                country: 'Populated country'
            },
            physicalAddress: {
                street: 'Populated Physical company Street',
                town: 'Populated Town',
                state: 'Populated state',
                zipCode: 'Populated zipCode',
                contry: 'Populated country'
            }
        }

        const company = await Company.create(newCompany)
        const users = [
            {
                name: "Adrian",
                lastName: "Ruiz",
                email: "12@12.com",
                password: "123123123Aa!",
                company: company.id,
                role: "admin"
            },
            {
                name: "Accountant",
                lastName: "Surname",
                email: "a12@12.com",
                password: "123123123Aa!",
                company: company.id,
                role: "accountant"
            },
            {
                name: "Employee",
                lastName: "Surname",
                email: "e12@12.com",
                password: "123123123Aa!",
                company: company.id,
                role: "employee"
            }
        ]

        const _users = await User.create(users)

        //TODO DE ESTA MANERA DOY POR HECHO QUE EL PRIMER USUARIO SIEMPRE SERÁ EL ADMIN... Y PODRÍA ACABAR ANTES LA SEGUNDA PROMESA... DEBERIA REALIZAR UN IF PARA COMPROBAR EL NOMBRE/ROL
        company.admin = _users[0]
        company.users.push(..._users)
        await company.save()

        const items = [{
            company: company.id,
            name: "Populated item 1",
            description: "Populated item description",
            sku: "SKU-P0001",
            category: "Electronics",
            stock: 50,
            minStock: 20,
            cost: 50
        },
        {
            company: company.id,
            name: "Populated item 2",
            description: "Populated item description",
            sku: "SKU-P0002",
            category: "Food",
            stock: 33,
            minStock: 10,
            cost: 20
        },
        {
            company: company.id,
            name: "Populated item 3",
            description: "Populated item description",
            sku: "SKU-P0003",
            category: "Drink",
            stock: 200,
            minStock: 100,
            cost: 100
        },
        {
            company: company.id,
            name: "Populated item 4",
            description: "Populated item description",
            sku: "SKU-P0004",
            stock: 0,
            minStock: 10,
            cost: 5
        },
        {
            company: company.id,
            name: "Populated item 5",
            sku: "SKU-P0005",
            stock: 80,
            minStock: 30,
            cost: 30
        },
        {
            company: company.id,
            name: "Populated item 6",
            sku: "SKU-P0006",
            category: "Electronics",
            stock: 0,
            minStock: 10,
            cost: 20
        },
        {
            company: company.id,
            name: "Populated item 7",
            description: "Populated item description",
            sku: "SKU-P0007",
            stock: 90,
            minStock: 15,
            cost: 40
        },
        {
            company: company.id,
            name: "Populated item 8",
            sku: "DIF-001",
            stock: 33,
            minStock: 10,
            cost: 20
        },
        {
            company: company.id,
            name: "Populated item 9",
            description: "Populated item description",
            sku: "DIF-002",
            category: "Drink",
            stock: 100,
            minStock: 50,
            cost: 1
        }]

        const _items = await InventoryItem.create(items)

        const customers = [{
            company: company.id,
            name: "Populated Full Customer",
            email: "erp.adrianruiz@gmail.com",
            phone: 111222333,
            website: "www.populated.com",
            legalId: '123123123-X',
            billingAddress: {
                street: "C/ Ramirez De Prado 5, Edificio Atica 2",
                town: "Madrid",
                state: "Madrid",
                zipCode: "28045",
                country: "Spain",
            },
            shippingAddress: {
                shippingStreet: "C/ Inventada Shipping",
                shippingTown: "Barcelona",
                shippingState: "Barcelona",
                shippingZipCode: "08001",
                shippingCountry: "Spain"
            },
            payTerms: "30 days"
        },
        {
            company: company.id,
            name: "Populated Customer 2 Empty"
        },
        {
            company: company.id,
            name: "Populated Customer 3 Empty"
        },
        {
            company: company.id,
            name: "Populated Customer 4 Mid",
            email: "customer4@customer4.com",
            billingAddress: {
                street: "Invented",
                town: "Madrid",
                state: "Madrid",
                zipCode: "28045",
                country: "Spain",
            },
            shippingAddress: {
                shippingStreet: "C/ Inventada Shipping",
                shippingTown: "Barcelona",
                shippingState: "Barcelona",
                shippingZipCode: "08001",
                shippingCountry: "Spain"
            }
        },
        {
            company: company.id,
            name: "Populated Customer 5 Mid",
            email: "customer5@customer5.com",
            billingAddress: {
                street: "C/ Customer 5",
                town: "Madrid",
                state: "Madrid",
                zipCode: "28045",
                country: "Spain",
            },
            shippingAddress: {
                shippingStreet: "C/ Inventada Shipping",
                shippingTown: "Barcelona",
                shippingState: "Barcelona",
                shippingZipCode: "08001",
                shippingCountry: "Spain"
            }
        }]

        const _customers = await Customer.create(customers)

        const estimates = [{
            company: company.id,
            estimateNumber: "P001",
            customer: {
                refId: _customers[0].id,
                name: _customers[0].name,
                email: _customers[0].email,
                billingAddress: _customers[0].billingAddress,
                shippingAddress: _customers[0].shippingAddress,
            },
            terms: _customers[0].payTerms,
            estimateDate: new Date(),
            products: [{
                id: _items[0].id,
                name: _items[0].name,
                description: _items[0].description,
                price: 6,
                amount: 10,
                tax: 21
            },
            {
                id: _items[1].id,
                name: _items[1].name,
                description: _items[1].description,
                price: 10,
                amount: 5,
                tax: 21
            }],
            totalAmount: 133.1
        },
        {
            company: company.id,
            estimateNumber: "P002",
            customer: {
                refId: _customers[0].id,
                name: _customers[0].name,
                email: _customers[0].email,
                billingAddress: _customers[0].billingAddress,
                shippingAddress: _customers[0].shippingAddress,
            },
            terms: _customers[0].payTerms,
            estimateDate: new Date(),
            products: [{
                id: _items[0].id,
                name: _items[0].name,
                description: _items[0].description,
                price: 6,
                amount: 10,
                tax: 21
            },
            {
                id: _items[1].id,
                name: _items[1].name,
                description: _items[1].description,
                price: 10,
                amount: 5,
                tax: 21
            }],
            totalAmount: 133.1
        },
        {
            company: company.id,
            estimateNumber: "P003",
            customer: {
                refId: _customers[0].id,
                name: _customers[0].name,
                email: _customers[0].email,
                billingAddress: _customers[0].billingAddress,
                shippingAddress: _customers[0].shippingAddress,
            },
            terms: _customers[0].payTerms,
            estimateDate: new Date(),
            products: [{
                id: _items[0].id,
                name: _items[0].name,
                description: _items[0].description,
                price: 6,
                amount: 10,
                tax: 21
            },
            {
                id: _items[1].id,
                name: _items[1].name,
                description: _items[1].description,
                price: 10,
                amount: 5,
                tax: 21
            }],
            totalAmount: 133.1
        },
        {
            company: company.id,
            estimateNumber: "P004",
            customer: {
                refId: _customers[1].id,
                name: _customers[1].name,
                email: _customers[1].email,
                billingAddress: _customers[1].billingAddress,
                shippingAddress: _customers[1].shippingAddress,
            },
            terms: 'Manual Terms',
            estimateDate: new Date(),
            products: [{
                id: _items[0].id,
                name: _items[0].name,
                description: _items[0].description,
                price: 6,
                amount: 10,
                tax: 21
            },
            {
                id: _items[1].id,
                name: _items[1].name,
                description: _items[1].description,
                price: 10,
                amount: 5,
                tax: 21
            }],
            totalAmount: 133.1
        }]

        await Estimate.create(estimates)

        const invoiceData1 = {
            invoiceNumber: "FR001",
            customer: {
                refId: _customers[0].id,
                name: _customers[0].name,
                email: _customers[0].email,
                billingAddress: _customers[0].billingAddress,
                shippingAddress: _customers[0].shippingAddress,
            },
            terms: _customers[0].payTerms,
            invoiceDate: new Date(),
            dueDate: new Date(),
            products: [{
                id: _items[0].id,
                name: _items[0].name,
                description: _items[0].description,
                price: 6,
                amount: 10,
                tax: 21,
                total: 72.6
            },
            {
                id: _items[1].id,
                name: _items[1].name,
                description: _items[1].description,
                price: 10,
                amount: 5,
                tax: 21,
                total: 60.5
            }],
            totalAmount: 133.1
        }

        const invoiceData2 = {
            invoiceNumber: "FR002",
            customer: {
                refId: _customers[0].id,
                name: _customers[0].name,
                email: _customers[0].email,
                billingAddress: _customers[0].billingAddress,
                shippingAddress: _customers[0].shippingAddress,
            },
            terms: _customers[0].payTerms,
            invoiceDate: new Date(),
            dueDate: new Date(),
            products: [{
                id: _items[0].id,
                name: _items[0].name,
                description: _items[0].description,
                price: 6,
                amount: 10,
                tax: 21,
                total: 72.6
            },
            {
                id: _items[1].id,
                name: _items[1].name,
                description: _items[1].description,
                price: 10,
                amount: 5,
                tax: 21,
                total: 60.5
            }],
            totalAmount: 133.1
        }
        await createInvoice(company.id, invoiceData1)
        await createInvoice(company.id, invoiceData2)

        await mongoose.disconnect()
    })()