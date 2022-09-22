import './InventorySummaryBox.css'

function InventorySummaryBox({category, stock, color}){
    return(
        <div className={`inventory__summaryBox__${color}`}>
            <h2 className='summaryBox__category'>{category}</h2>
            <h2 className='summaryBox__stock'>{stock}</h2>
        </div>
    )
}

export default InventorySummaryBox