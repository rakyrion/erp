import Context from './utils/Context'
import Dashboard from './pages/Dashboard'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'



function App() {

  const navigate = useNavigate()

  const handleNavigationToHome = () => {
    navigate('/')
  }

  const handleNavigationToRegister = () => {
    navigate('/register')
  }

  const handleNavigationToLogin = () => {
    navigate('/login')
  }

  const handleLogOut = () => {
    const result = window.confirm('Are you sure to Log Out?')
    if (result){
      sessionStorage.removeItem('UserToken')
      navigate('/')
    }else return

  }
  return (
    <Context.Provider value={handleLogOut}>
    <Routes>
      <Route path='/*' element={sessionStorage.UserToken ? <Dashboard /> : <Navigate to='/login' />} />
      <Route path='/login' element={!(sessionStorage.UserToken) ? <LoginPage onLogin={handleNavigationToHome} navigateRegister={handleNavigationToRegister}/> : <Navigate to='/' />} />
      <Route path='/register' element={<RegisterPage navigateLogin={handleNavigationToLogin}/>} />
    </Routes>
    </Context.Provider>

  );
}

export default App;
