import './App.css'
import { MainHero } from './components/MainHero.tsx'
import Navbar from './components/Navbar.tsx'
import RegisterLayout from './components/RegisterComponents/RegisterLayout.tsx'
import VerifyEmail from './components/RegisterComponents/VerifyEmail.tsx'

function App() {

  return (
    <>
    <Navbar/>
    <MainHero/>
    <RegisterLayout/>
    <VerifyEmail/>
    </>
  )
}

export default App
