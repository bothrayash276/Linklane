import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Header from './Components/Header.jsx'
import Register from './Pages/Register.jsx'
import Home from './Pages/Home.jsx'

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

  {/* Home Router Page */}
  <Route
    path={'/:id'}
    element={<>
        <Header/>
        <Home/>
      </>}
  />

  </Routes>
    </>
  )
}

export default App
