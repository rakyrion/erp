import { createProduct } from '../../logic'
import { toaster } from 'evergreen-ui'
function NewProductPanel({ onCloseClick, onCreateProduct }) {

    const handleNewProductSubmit = event => {
        event.preventDefault()

        const { target: form,
            target: {
                name : { value : name},
                sku : { value : sku },
                category : { value : category },
                description : { value : description},
                cost : { value : cost },
                initStock : { value : initStock },
                minStock : { value : minStock }
            } } = event

            ;(async() => {
                try{
                    await createProduct(sessionStorage.UserToken, name, sku, {category, description, cost, initStock, minStock})

                    toaster.success(`Product ${name} created successfully`, {duration : 3})
                    form.reset()
                    onCreateProduct()
                }catch(error){
                    toaster.warning(error.message, {duration : 3})
                }
                
            })()
    }
    return (
        <div className="newFormPanel__page">
            <div className='newFormPanel__container'>
                <div className='newFormPanel__header'>
                    <h2 className='newFormPanel__headerTitle'>New Product</h2>
                    <button className='noButton right-corner ' onClick={onCloseClick}>
                        <span className="material-symbols-outlined closeX">close</span>
                    </button>

                </div>
                <div className="newFormPanel__formContainer">
                    <form className='newFormPanel__form' onSubmit={handleNewProductSubmit}>
                        <div className='newFormPanel__categorySpan'><h2 className='newFormPanel__categoryTitle'>Product info</h2></div>
                        <label className='form__label' htmlFor="name">Product name*</label>
                        <input className='form__input newFormPanel__input' type='text' name='name' required='true'></input>
                        <label className='form__label' htmlFor="sku">SKU*</label>
                        <input className='form__input' type='text' name='sku' required='true'></input>
                        <label className='form__label' htmlFor="category">Category</label>
                        <input className='form__input' type='text' name='category'></input>
                        <label className='form__label' htmlFor="description">Product description</label>
                        <input className='form__input' type='text' name='description'></input>
                        <div className='newFormPanel__categorySpan'><h2 className='newFormPanel__categoryTitle'>More info</h2></div>
                        <label className='form__label' htmlFor="cost">Purchase cost</label>
                        <input className='form__input' type='text' name='cost'></input>
                        <label className='form__label' htmlFor="initStock">Initial stock</label>
                        <input className='form__input' type='text' name='initStock'></input>
                        <label className='form__label' htmlFor="minStock">Safety stock quantity</label>
                        <input className='form__input' type='text' name='minStock'></input>
                        <button className='form__button form__submit' type='submit'>Create product</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default NewProductPanel