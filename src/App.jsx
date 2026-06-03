import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Header from './Components/Header.jsx'
import Register from './Pages/Register.jsx'
import Home from './Pages/Home.jsx'
import Personal from './Pages/Personal.jsx'
import bg1 from '../public/bg11.webp'
import bg2 from '../public/bg22.jpg'
import bg3 from '../public/bg33.jpg'
import bgTemp from '../public/login.jpg'
import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './Components/ThemeContext.jsx'

const App = () => {

  const [bg, setBg] = useState(localStorage.getItem('bg') || bgTemp)
  const {page} = useContext(ThemeContext)
  useEffect(()=>{
    if (page === '#b0efbc') {
      setBg(bg1)
      localStorage.setItem('bg', bg1)
    }
    if (page === '#29cadb') {
      setBg(bg2)
      localStorage.setItem('bg', bg2)
    }
    if (page === '#e9cff6') {
      setBg(bg3)
      localStorage.setItem('bg', bg3)
    }
  }, [page])

  return (
    <>
    <div
    style={{ backgroundImage : `url(${bg})`}}>
      <Routes>

  {/* Login Page Router */}
  <Route 
    path='/login'
    element={
      <>
      <Login/>
      </>
    }
  />
  <Route 
    path='/'
    element={
      <>
      <Login/>
      </>
    }
  />

  {/* Register Router Page */}
  <Route
    path='/register'
    element={
      <>
        <Register/>
      </>
    }
  />

  {/* Home Router Page */}
  <Route
    path={'/:id'}
    element={<>
        <Home/>
      </>}
  />

  {/* Personal Information Edit Router Page */}
  <Route
    path={'/:id/profile'}
    element={
      <>
      <Personal/>
      </>
    }
  />

    </Routes>
    </div>
    </>
  )
}

export default App
