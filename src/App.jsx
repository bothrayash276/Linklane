import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Header from './Components/Header.jsx'
import Register from './Pages/Register.jsx'

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

  </Routes>
    </>
  )
}

export default App
