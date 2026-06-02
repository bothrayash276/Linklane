import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Header from './Components/Header.jsx'
import Register from './Pages/Register.jsx'
import Home from './Pages/Home.jsx'
import Personal from './Pages/Personal.jsx'

const App = () => {

  

  return (
    <>
      <Routes>

  {/* Login Page Router */}
  <Route 
    path='/login'
    element={
      <>
      <Header />
      <Login/>
      </>
    }
  />
  <Route 
    path='/'
    element={
      <>
      <Header />
      <Login/>
      </>
    }
  />

  {/* Register Router Page */}
  <Route
    path='/register'
    element={
      <>
        <Header/>
        <Register/>
      </>
    }
  />

  {/* Home Router Page */}
  <Route
    path={'/:id'}
    element={<>
        <Header/>
        <Home/>
      </>}
  />

  {/* Personal Information Edit Router Page */}
  <Route
    path={'/:id/profile'}
    element={
      <>
      <Header/>
      <Personal/>
      </>
    }
  />

  </Routes>
    </>
  )
}

export default App
