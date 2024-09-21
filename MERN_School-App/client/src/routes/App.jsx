import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import LandingPage from '../pages/Landpage/index'
import InfoPage from '../pages/Infopage/index'
import Header from '../components/Header'
import ContactUsPage from '../pages/ContactUsPage'
import AdmissionPage from '../pages/AdmissionPage'
import { useEffect } from 'react'

function App() {

  const navigate = useNavigate()

  const location = useLocation();

  const access = location.pathname === '/admin-acess-grant' 
  useEffect(() => {
    if (access) {
      navigate('/admin/govt-sr-sec-school-ss')
    }
   },[access])
  return (
    <div className='client'>
      <Header auth={true} />
      <Routes>
        <Route path='*' element={ <LandingPage /> } /> 
        <Route path='/admin-acess-grant' /> 
        <Route path='/admission' element={ <AdmissionPage /> } />
        <Route path='/info' element={ <InfoPage /> } />  
        <Route path='/contact-us' element={ <ContactUsPage /> } /> 
      </Routes>
     </div>
  )
}

export default App
