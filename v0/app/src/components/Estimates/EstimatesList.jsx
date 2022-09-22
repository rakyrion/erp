import './EstimatesList.css'
import { useEffect, useState } from 'react'
import EnhancedTable from './EstimatesTable'
import { retrieveAEstimate, retrieveEstimates } from '../../logic'
import { toaster } from 'evergreen-ui'
import EstimateCreatorPanel from './EstimateCreatorPanel'
import EstimateEditPanel from './EstimateEditPanel'

function EstimatesList() {

    const [estimates, setEstimates] = useState(null)
    const [view, setView] = useState('estimatesList')
    const [estimateToEdit, setEstimateToEdit] = useState(null)

    useEffect(() => {
        ; (async () => {
            try {
                const estimates = await retrieveEstimates(sessionStorage.UserToken)
                setEstimates(estimates)

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }, [])

    const newEstimateClickHandler = () => {
        setView('newEstimate')
    }

    const handleSetViewList = () => {
        setView('estimatesList')
    }

    const handleRefreshEstimates = () => {
        ; (async () => {
            try {
                const estimates = await retrieveEstimates(sessionStorage.UserToken)
                setEstimates(estimates)
                setView('estimatesList')

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }

    const handleDeleteEstimate = () => {
        ; (async () => {
            try {
                const updatedEstimates = await retrieveEstimates(sessionStorage.UserToken)
                setEstimates(updatedEstimates)

            } catch (error) {
                toaster.warning('Something went wrong', { duration: 2.5, description: error.message })
            }
        })()
    }

    const handleEditEstimateClick = async estimateId => {
        const estimate = await retrieveAEstimate(sessionStorage.UserToken, estimateId)
        setEstimateToEdit(estimate)
        setView('editEstimate')
    }

    return (

        <div className="main-section__estimates">
            {view === 'editEstimate' && <EstimateEditPanel estimate={estimateToEdit} handleSetViewList={handleSetViewList} onSubmitEstimate={handleRefreshEstimates} />}
            {view === 'newEstimate' && <EstimateCreatorPanel handleSetViewList={handleSetViewList} onSubmitEstimate={handleRefreshEstimates} />}
            {view === 'estimatesList' &&
                <>
                    <button className='newButton' onClick={newEstimateClickHandler} >New Estimate</button>
                    <div className='estimates__tableContainer'>
                        {estimates && <EnhancedTable data={estimates} onDeleteEstimate={handleDeleteEstimate} onEditClick={handleEditEstimateClick} />}
                    </div>
                </>
            }

        </div>
    )
}

export default EstimatesList