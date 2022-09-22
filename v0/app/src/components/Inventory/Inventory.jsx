import { useEffect, useState } from 'react'
import InventorySummaryBox from './InventorySummaryBox'
import './Inventory.css'
import EnhancedTable from './InventoryTable'
import { retrieveStock, retrieveAItem } from '../../logic'
import { toaster } from 'evergreen-ui'
import NewProductPanel from './NewProductPanel'
import EditProductPanel from './EditProductPanel'

function Inventory() {
    const [stock, setStock] = useState(null)
    const [view, setView] = useState('summary')
    const [itemToEdit, setItemToEdit] = useState(null)

    useEffect(() => {
        ; (async () => {
            try {
                const stock = await retrieveStock(sessionStorage.UserToken)
                setStock(stock)

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }, [])

    const handleNewProductClick = () => {
        setView('newProduct')
    }

    const handleCloseClick = () => {
        setView('summary')
    }

    const handleCreateProduct = () => {
        ; (async () => {
            try {
                const updatedStock = await retrieveStock(sessionStorage.UserToken)
                setStock(updatedStock)
                setView('summary')

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }

    const handleDeleteProduct = () => {
        ; (async () => {
            try {
                const updatedStock = await retrieveStock(sessionStorage.UserToken)
                setStock(updatedStock)
                /* setView('summary') */

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }

    const handleEditItemClick = async itemId => {

        const item = await retrieveAItem(sessionStorage.UserToken, itemId)
        setItemToEdit(item)
        setView('editItem')
    }

    const handleEditItem = async () => {
        try {
            const updatedStock = await retrieveStock(sessionStorage.UserToken)
            setStock(updatedStock)
            setView('summary')

        } catch (error) {
            toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
        }
    }

    return (
        <>
            {view === 'newProduct' && <NewProductPanel onCloseClick={handleCloseClick} onCreateProduct={handleCreateProduct} />}
            {view === 'editItem' && <EditProductPanel item={itemToEdit} onCloseClick={handleCloseClick} onEditItem={handleEditItem}/>}
            <div className="main-section__inventory">
                <button className='newButton' onClick={handleNewProductClick}>New Product</button>
                <div className='inventory__summary'>

                    <div className='inventory__summaryTitle'>Summary</div>
                    <div className='inventory__summaryCategories'>
                        <InventorySummaryBox category='Out of stock' color='red' stock='33' />
                        <InventorySummaryBox category='Out of stock' color='orange' stock='33' />
                        <InventorySummaryBox category='Out of stock' color='purple' stock='33' />
                        <InventorySummaryBox category='Out of stock' color='green' stock='33' />
                        <InventorySummaryBox category='Out of stock' color='blue' stock='33' />
                        <InventorySummaryBox category='Out of stock' color='red' stock='33' />
                    </div>
                </div>
                <div className='inventory__products'>
                    {stock && <EnhancedTable stock={stock} onDeleteProduct={handleDeleteProduct} onEditClick={handleEditItemClick} />}
                </div>
            </div>
        </>
    )
}

export default Inventory