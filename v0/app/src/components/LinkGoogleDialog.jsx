import { Pane, Dialog } from 'evergreen-ui'
import './DeleteDialog.css'
import { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'
import { toaster } from 'evergreen-ui'
import { linkGoogleAccount } from '../logic'

const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

function LinkGoogleDialog({ status, onFinish }) {

  const [googleId, setGoogleId] = useState(null)

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: REACT_APP_GOOGLE_CLIENT_ID,
        scope: ""
      })
    }

    gapi.load('client:auth2', start)
  })

  const SignupGoogleSuccessHandler = res => {
    const { profileObj: {
      googleId,

    } } = res

    setGoogleId(googleId)
  }

  const SignupGoogleFailHandler = res => {
    toaster.warning('Google authentication error')
    console.log(res)
  }

  const handleLinkGoogleAccountSubmit = async event => {
    event.preventDefault()

    const { target: form, target: {
      password: { value: password }
    } } = event

    try {
      await linkGoogleAccount(sessionStorage.UserToken, password, googleId)
      form.reset()
      onFinish()
      toaster.success('Google account linked successfully')
    } catch (error) {
      toaster.warning('Something went wrong', { duration: '2.5', description: error.message })

    }
  }

  return (
    <Pane>
      <Dialog
        isShown={status}
        title={"Please confirm your password to link your account"}
        onCloseComplete={() => onFinish()}
        hasFooter={false}
      >
        Please, write your password first and then press google button to link your account
        <form onSubmit={handleLinkGoogleAccountSubmit}>
          <label htmlFor='password' className='form__label'>Password</label>
          <input className='form__input' type='password' name='password'></input>
          <button className='form__button form__submit' type="submit">Link Account</button>

        </form>
        <GoogleLogin
          clientId={REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Link Google Account"
          onSuccess={SignupGoogleSuccessHandler}
          onFailure={SignupGoogleFailHandler}
          cookiePolicy={'single_host_origin'}
        />
      </Dialog>
    </Pane>
  )
}

export default LinkGoogleDialog