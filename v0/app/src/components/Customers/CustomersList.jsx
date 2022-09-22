import './CustomersList.css'
import { useEffect, useState } from 'react'
import EnhancedTable from './CustomersTable'
import { retrieveCustomers, retrieveACustomer } from '../../logic'
import { toaster } from 'evergreen-ui'
import NewCustomerPanel from './NewCustomerPanel'
import EditCustomerPanel from './EditCustomerPanel'

function CustomersList() {

    const [customers, setCustomers] = useState(null)
    const [view, setView] = useState('customersList')
    const [customerToEdit, setCustomerToEdit] = useState(null)

    useEffect(() => {
        ; (async () => {
            try {
                const customers = await retrieveCustomers(sessionStorage.UserToken)
                setCustomers(customers)

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }, [])

    const handleNewCustomerClick = () => {
        setView('newCustomer')
    }

    const handleCloseClick = () => {
        setView('customersList')
    }

    const handleCreateCustomer = () => {

        ; (async () => {
            try {
                const updatedCustomers = await retrieveCustomers(sessionStorage.UserToken)
                setCustomers(updatedCustomers)
                setView('customersList')

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }

    const handleDeleteCustomer = () => {
        ; (async () => {
            try {
                const updatedCustomers = await retrieveCustomers(sessionStorage.UserToken)
                setCustomers(updatedCustomers)

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }

    const handleEditCustomerClick = async customerId => {
        const customer = await retrieveACustomer(sessionStorage.UserToken ,customerId)
        setCustomerToEdit(customer)
        setView('editCustomer')

    }

    const handleEditCustomer = () => {
        ; (async () => {
            try {
                const updatedCustomers = await retrieveCustomers(sessionStorage.UserToken)
                setCustomers(updatedCustomers)
                setView('customersList')

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }

    return (
        <>
            {view === 'newCustomer' && <NewCustomerPanel onCloseClick={handleCloseClick} onCreateCustomer={handleCreateCustomer} />}
            {view === 'editCustomer' && <EditCustomerPanel customer={customerToEdit} onCloseClick={handleCloseClick} onEditCustomer={handleEditCustomer} />}
            <div className="main-section__customers">
                <button className='newButton' onClick={handleNewCustomerClick}>New Customer</button>
                <div className='customers__tableContainer'>

                    {customers && <EnhancedTable data={customers} onDeleteCustomer={handleDeleteCustomer} onEditClick={handleEditCustomerClick} />}
                </div>
            </div>
        </>
    )
}

export default CustomersList