import './RegisterPage.css'
import { registerUser, registerUserGoogle } from '../logic'
import { toaster } from 'evergreen-ui'
import GoogleLogin from 'react-google-login'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
function RegisterPage({ navigateLogin }) {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId : REACT_APP_GOOGLE_CLIENT_ID,
                scope: ""
            })
        }

        gapi.load('client:auth2', start)
    })

    const registerHandler = event => {
        event.preventDefault()

        const { target: form, target: {
            name: { value: name },
            lastName: {value: lastName},
            email: { value: email },
            password: { value: password },
            confirmPassword : {value: confirmPassword}
        } } = event
        ;(async () => {
            try {
                await registerUser(name, lastName, email, password, confirmPassword)
                form.reset()
                navigateLogin()
                toaster.success('Account registered successfully')
            } catch (error) {
                toaster.warning('Something went wrong', {duration : '2.5', description: error.message})
            }
        })()
    }

    const SignupGoogleSuccessHandler = res => {
        const {profileObj : {
            email,
            givenName : name,
            familyName : lastName,
            googleId,

        }} = res
        ; (async () => {
            try {
                await registerUserGoogle(name, lastName, email, googleId)
                navigateLogin()
                toaster.success('Account registered successfully with Google')
            } catch (error) {
                toaster.warning('Something went wrong', {duration : '2.5', description: error.message})
            }
        })()
    }

    const SignupGoogleFailHandler = res => {
        toaster.warning('Register with google error')
        console.log(res)
    }
    return (
        <div className="registerPage">
            <div className="registerForm__container">
                <h2 className='register__title'>Create new account</h2>
                <p className='register__p__italic'>Your finances, made simple</p>
                <form className='form register__form' action='#' onSubmit={registerHandler}>
                    <label className='form__label' htmlFor="name">Name</label>
                    <input className='form__input' type="text" name="name"></input>

                    <label className='form__label' htmlFor="lastName">Last Name</label>
                    <input className='form__input' type="text" name="lastName"></input>

                    <label className='form__label' htmlFor="email">Email</label>
                    <input className='form__input' type="text" name="email"></input>

                    <label className='form__label' htmlFor="password">Password</label>
                    <input className='form__input' type="password" name="password"></input>

                    <label className='form__label' htmlFor="confirmPassword">Confirm Password</label>
                    <input className='form__input' type="password" name="confirmPassword"></input>
                    <div className='form__linksContainer'>
                        <a href='#' className='form__link' onClick={navigateLogin}>Already have an account? Login</a>
                    </div>
                    <button className='form__button form__submit' type="submit">Create Account</button>
                    <GoogleLogin
                        clientId={REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Sign Up with Google"
                        onSuccess={SignupGoogleSuccessHandler}
                        onFailure={SignupGoogleFailHandler}
                        cookiePolicy={'single_host_origin'}
                    />
                </form>
            </div>
        </div>
    )
}

export default RegisterPage