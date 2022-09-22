import './SettingsDropdown.css'
import { useState } from 'react'
import withContext from '../utils/withContext'
import { CSSTransition } from 'react-transition-group';
import LinkGoogleDialog from './LinkGoogleDialog';

function SettingsDropdown({ context: useHandleLogOut }) {

    const [dropdownView, setDropdownView] = useState(null)
    const [dialogView, setDialogView] = useState(false)
    const handleCategoryClick = view => {
        if (view === dropdownView) setDropdownView(null)

        else if (dropdownView !== null) {
            setDropdownView(null)
            setTimeout(() => setDropdownView(view), 290)
        }

        else {
            setDropdownView(view)
        }
    }

    const handleLinkGoogleClick = () => {
        setDialogView(true)
        setDropdownView(null)
    }

    const handleLinkGoogleDialogFinish = () => {
        setDialogView(false)
    }
    return (
        <>
            {dialogView && <LinkGoogleDialog status={true} onFinish={handleLinkGoogleDialogFinish}/>}
            <div className="settings__dropdownContainer">
                <div className="dropdown__categories">
                    <a className='reactLink' onClick={() => handleCategoryClick('account')}>Account</a>
                    <a className='reactLink' onClick={() => handleCategoryClick('invoices')}>Invoices</a>
                    <a className='reactLink' onClick={() => handleCategoryClick('stock')}>Stock</a>
                    <a href='#' className='reactLink' onClick={useHandleLogOut}>Logout</a>
                </div>
                <CSSTransition
                    in={dropdownView}
                    timeout={350}
                    classNames='fadeOutLeft'
                    unmountOnExit
                >
                    <div className="dropdown__links">

                        {dropdownView === 'account' &&
                            <>
                                <p className="dropdown__linksTitle">Account</p>
                                <a className='reactLink' >Account Settings</a>
                                <a className='reactLink' >Company Details</a>
                                <a className='reactLink' onClick={handleLinkGoogleClick}>Link google account</a>
                            </>
                        }
                        {dropdownView === 'invoices' &&
                            <>
                                <p className="dropdown__linksTitle">Invoices</p>
                                <a className='reactLink' >Invoices 1</a>
                                <a className='reactLink' >Invoices 2</a>
                                <a className='reactLink' >Invoices 3</a>
                            </>
                        }
                        {dropdownView === 'stock' &&
                            <>
                                <p className="dropdown__linksTitle">Stock</p>
                                <a className='reactLink' >Stock 1</a>
                                <a className='reactLink' >Stock 2</a>
                                <a className='reactLink' >Stock 3</a>
                            </>
                        }
                    </div>
                </CSSTransition>
            </div>
        </>
    )
}

export default withContext(SettingsDropdown)