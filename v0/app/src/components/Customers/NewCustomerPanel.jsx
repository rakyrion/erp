import { createCustomer } from '../../logic'
import { toaster } from 'evergreen-ui'
function NewCustomerPanel({ onCloseClick, onCreateCustomer }) {

    const handleNewCustomerSubmit = async event => {
        event.preventDefault()

        const { target: form,
            target: {
                name: { value: name },
                email: { value: email },
                phone: { value: phone },
                legalId: { value: legalId },
                street: { value: street },
                town: { value: town },
                state: { value: state },
                postalCode: { value: postalCode },
                country: { value: country },
                shippingStreet: { value: shippingStreet },
                shippingTown: { value: shippingTown },
                shippingState: { value: shippingState },
                shippingPostalCode: { value: shippingPostalCode },
                shippingCountry: { value: shippingCountry },
                payTerms: { value: payTerms },
                website: { value: website }

            } } = event

                try {
                    await createCustomer(sessionStorage.UserToken, name, { email, phone, legalId, billingAddress: { street, town, state, postalCode, country }, shippingAddress: { shippingStreet, shippingTown, shippingState, shippingPostalCode, shippingCountry }, payTerms, website })

                    toaster.success(`Customer ${name} created successfully`, { duration: 3 })
                    onCreateCustomer()
                    form.reset()
                    
                } catch (error) {
                    toaster.warning(error.message, { duration: 3 })
                }
    }
    return (
        <div className="newFormPanel__page">
            <div className='newFormPanel__container'>
                <div className='newFormPanel__header'>
                    <h2 className='newFormPanel__headerTitle'>New Customer</h2>
                    <button className='noButton right-corner ' onClick={onCloseClick}>
                        <span className="material-symbols-outlined closeX">close</span>
                    </button>

                </div>
                <div className="newFormPanel__formContainer">
                    <form className='newFormPanel__form' onSubmit={handleNewCustomerSubmit}>
                        <div className='newFormPanel__categoryTitle'><h2 className='newFormPanel__categorySpan'>Contact details</h2></div>
                        <label className='form__label' htmlFor="name">Name*</label>
                        <input className='form__input newFormPanel__input' type='text' name='name'></input>
                        <label className='form__label' htmlFor="email">Email</label>
                        <input className='form__input' type='email' name='email'></input>
                        <label className='form__label' htmlFor="phone">Phone</label>
                        <input className='form__input' type='text' name='phone'></input>
                        <div className='newFormPanel__categoryTitle'><h2 className='newFormPanel__categorySpan'>Legal info</h2></div>
                        <label className='form__label' htmlFor="legalId">Legal ID</label>
                        <input className='form__input' type='text' name='legalId'></input>
                        <div className='newFormPanel__categoryTitle'><h2 className='newFormPanel__categorySpan'>Billing Address</h2></div>
                        <label className='form__label' htmlFor="street">Street</label>
                        <input className='form__input' type='text' name='street'></input>
                        <label className='form__label' htmlFor="town">Town</label>
                        <input className='form__input' type='text' name='town'></input>
                        <label className='form__label' htmlFor="state">State</label>
                        <input className='form__input' type='text' name='state'></input>
                        <label className='form__label' htmlFor="postalCode">Postal code</label>
                        <input className='form__input' type='text' name='postalCode'></input>
                        <label className='form__label' htmlFor="country">Country</label>
                        <input className='form__input' type='text' name='country'></input>
                        <div className='newFormPanel__categoryTitle'><h2 className='newFormPanel__categorySpan'>Shipping Address</h2></div>
                        <label className='form__label' htmlFor="shippingStreet">Street</label>
                        <input className='form__input' type='text' name='shippingStreet'></input>
                        <label className='form__label' htmlFor="shippingTown">Town</label>
                        <input className='form__input' type='text' name='shippingTown'></input>
                        <label className='form__label' htmlFor="shippingState">State</label>
                        <input className='form__input' type='text' name='shippingState'></input>
                        <label className='form__label' htmlFor="shippingPostalCode">Postal code</label>
                        <input className='form__input' type='text' name='shippingPostalCode'></input>
                        <label className='form__label' htmlFor="shippingCountry">Country</label>
                        <input className='form__input' type='text' name='shippingCountry'></input>
                        <div className='newFormPanel__categorySpan'><h2 className='newFormPanel__categoryTitle'>More info</h2></div>
                        <label className='form__label' htmlFor="payTerms">Pay terms</label>
                        <input className='form__input' type='text' name='payTerms'></input>
                        <label className='form__label' htmlFor="website">Website</label>
                        <input className='form__input' type='text' name='website'></input>
                        <button className='form__button form__submit' type='submit'>Create customer</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default NewCustomerPanel