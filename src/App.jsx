import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login.jsx'

const App = () => {

  

  return (
    <>
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

  </Routes>
    </>
  )
}

export default App
