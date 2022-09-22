import './LoginPage.css'
import { authenticateUser, authenticateUserGoogle } from '../logic'
import { toaster } from 'evergreen-ui'
import GoogleLogin from 'react-google-login'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
import LoginCarousel from '../components/LoginCarousel'

const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
function LoginPage({ onLogin, navigateRegister }) {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId : REACT_APP_GOOGLE_CLIENT_ID,
                scope: ""
            })
        }

        gapi.load('client:auth2', start)
    })
    const loginHandler = (event) => {

        event.preventDefault()

        const { target: form, target: {
            email: { value: email },
            password: { value: password }
        } } = event

            ; (async () => {
                try {
                    const token = await authenticateUser(email, password)
                    sessionStorage.setItem('UserToken', token)
                    form.reset()
                    onLogin()
                } catch (error) {
                    toaster.warning('Something went wrong', { duration: 3, description: error.message })
                }
            })()
    }

    const loginGoogleSuccessHandler = res => {
        ; (async () => {
            try {
                const token = await authenticateUserGoogle(res.googleId)
                sessionStorage.setItem('UserToken', token)
                onLogin()
            } catch (error) {
                toaster.warning('Something went wrong', { duration: 3, description: error.message })
            }
        })()
    }

    const loginGoogleFailHandler = res => {
        
        toaster.warning('Login with google error')
        console.log(res)
    }

    return (
        <div className="loginPage">
            <div className="loginForm__container">
                <h2 className='login__title'>Amazing ERP Online</h2>
                <form className='form login__form' action='#' onSubmit={loginHandler}>
                    <label className='form__label' htmlFor="email">Email</label>
                    <input className='form__input' type="email" name="email"></input>
                    <label className='form__label' htmlFor="password">Password</label>
                    <input className='form__input' type="password" name="password"></input>
                    <div className='form__linksContainer'>
                        <a href='#' className='form__link' onClick={navigateRegister}>Register free</a>
                        <a href='#' className='form__link__right'>Forgot your password?</a>
                    </div>
                    <button className='form__button form__submit' type="submit">Log In</button>
                    <GoogleLogin
                        clientId={REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log In with Google"
                        onSuccess={loginGoogleSuccessHandler}
                        onFailure={loginGoogleFailHandler}
                        cookiePolicy={'single_host_origin'}
                    />
                </form>
            </div>
            <div className="carrusel__container">
                <LoginCarousel />
            </div>
        </div>
    )
}

export default LoginPage