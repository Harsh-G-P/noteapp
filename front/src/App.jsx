import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import SplashCursor from './components/SplashCursor'

const App = () => {
  return (
    <div>
      <SplashCursor />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sign' element={<Signup/>} />
      </Routes>
    </div>
  )
}

export default App