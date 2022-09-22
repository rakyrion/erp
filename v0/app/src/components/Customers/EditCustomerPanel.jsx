import { editCustomer } from '../../logic'
import { toaster } from 'evergreen-ui'
function EditCustomerPanel({ customer, onCloseClick, onEditCustomer }) {

    const handleUpdateCustomerSubmit = async event => {
        event.preventDefault()
        
        debugger
        const { target: form,
            target: {
                name: { value: name },
                email: { value: email },
                phone: { value: phone },
                legalId: { value: legalId },
                street: { value: street },
                town: { value: town },
                state: { value: state },
                zipCode: { value: zipCode },
                country: { value: country },
                shippingStreet: { value: shippingStreet },
                shippingTown: { value: shippingTown },
                shippingState: { value: shippingState },
                shippingZipCode: { value: shippingZipCode },
                shippingCountry: { value: shippingCountry },
                payTerms: { value: payTerms },
                website: { value: website }

            } } = event

                try {
                    await editCustomer(sessionStorage.UserToken, customer.id, { name, email, phone, legalId, billingAddress: { street, town, state, zipCode, country }, shippingAddress: { shippingStreet, shippingTown, shippingState, shippingZipCode, shippingCountry }, payTerms, website })

                    toaster.success(`Customer ${name} created successfully`, { duration: 3 })
                    onEditCustomer()
                    form.reset()
                    
                } catch (error) {
                    toaster.warning(error.message, { duration: 3 })
                }
    }
    
    return (
        
        <div className="newFormPanel__page">
            <div className='newFormPanel__container'>
                <div className='newFormPanel__header'>
                    <h2 className='newFormPanel__headerTitle'>Edit customer {customer.name}</h2>
                    <button className='noButton right-corner ' onClick={onCloseClick}>
                        <span className="material-symbols-outlined closeX">close</span>
                    </button>

                </div>
                <div className="newFormPanel__formContainer">
                    <form className='newFormPanel__form' onSubmit={handleUpdateCustomerSubmit}>
                        <div className='newFormPanel__categoryTitle'><h2 className='newFormPanel__categorySpan'>Contact details</h2></div>
                        <label className='form__label' htmlFor="name">Name*</label>
                        <input className='form__input newFormPanel__input' type='text' name='name' defaultValue={customer.name ? customer.name : ''}></input>
                        <label className='form__label' htmlFor="email">Email</label>
                        <input className='form__input' type='email' name='email' defaultValue={customer.email ? customer.email : ''}></input>
                        <label className='form__label' htmlFor="phone">Phone</label>
                        <input className='form__input' type='text' name='phone' defaultValue={customer.phone ? customer.phone : ''}></input>
                        <div className='newFormPanel__categoryTitle'><h2 className='newFormPanel__categorySpan'>Legal info</h2></div>
                        <label className='form__label' htmlFor="legalId">Legal ID</label>
                        <input className='form__input' type='text' name='legalId' defaultValue={customer.legalId ? customer.legalId : ''}></input>
                        <div className='newFormPanel__categoryTitle'><h2 className='newFormPanel__categorySpan'>Billing Address</h2></div>
                        <label className='form__label' htmlFor="street">Street</label>
                        <input className='form__input' type='text' name='street' defaultValue={customer.billingAddress ? customer.billingAddress.street : ''}></input>
                        <label className='form__label' htmlFor="town">Town</label>
                        <input className='form__input' type='text' name='town' defaultValue={ customer.billingAddress ? customer.billingAddress.town : ''}></input>
                        <label className='form__label' htmlFor="state">State</label>
                        <input className='form__input' type='text' name='state' defaultValue={ customer.billingAddress ? customer.billingAddress.state : ''}></input>
                        <label className='form__label' htmlFor="zipCode">Postal code</label>
                        <input className='form__input' type='text' name='zipCode' defaultValue={customer.billingAddress ? customer.billingAddress.zipCode : ''}></input>
                        <label className='form__label' htmlFor="country">Country</label>
                        <input className='form__input' type='text' name='country' defaultValue={customer.billingAddress ? customer.billingAddress.country : ''}></input>
                        <div className='newFormPanel__categoryTitle'><h2 className='newFormPanel__categorySpan'>Shipping Address</h2></div>
                        <label className='form__label' htmlFor="shippingStreet">Street</label>
                        <input className='form__input' type='text' name='shippingStreet' defaultValue={customer.shippingAddress ? customer.shippingAddress.shippingStreet : ''}></input>
                        <label className='form__label' htmlFor="shippingTown">Town</label>
                        <input className='form__input' type='text' name='shippingTown' defaultValue={ customer.shippingAddress ? customer.shippingAddress.shippingTown : ''}></input>
                        <label className='form__label' htmlFor="shippingState">State</label>
                        <input className='form__input' type='text' name='shippingState' defaultValue={customer.shippingAddress ? customer.shippingAddress.shippingState : ''}></input>
                        <label className='form__label' htmlFor="shippingZipCode">Postal code</label>
                        <input className='form__input' type='text' name='shippingZipCode' defaultValue={customer.shippingAddress ? customer.shippingAddress.shippingZipCode : ''}></input>
                        <label className='form__label' htmlFor="shippingCountry">Country</label>
                        <input className='form__input' type='text' name='shippingCountry' defaultValue={customer.shippingAddress ? customer.shippingAddress.shippingCountry : ''}></input>
                        <div className='newFormPanel__categorySpan'><h2 className='newFormPanel__categoryTitle'>More info</h2></div>
                        <label className='form__label' htmlFor="payTerms">Pay terms</label>
                        <input className='form__input' type='text' name='payTerms' defaultValue={customer.payTerms ? customer.payTerms : ''}></input>
                        <label className='form__label' htmlFor="website">Website</label>
                        <input className='form__input' type='text' name='website' defaultValue={customer.website ? customer.website : ''}></input>
                        <button className='form__button form__submit' type='submit'>Update customer</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default EditCustomerPanel