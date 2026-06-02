import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import userLogin from '../api/User'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'

const Login = () => {

  // Form State
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  // Fxn to handle form
  const handleForm = e => {
    if (e.target.id === 'email') setEmail(e.target.value)
    else if (e.target.id === 'password') setPassword(e.target.value)
  }

  const logInUser = async () => {
    const result = await userLogin(email, password)
    localStorage.setItem('id', result)
    if (result) navigate(`/${result}`)
  }

  return (
    <>
      <div
      className='min-h-screen px-10 py-5'>

        <div
        w-full>
          <Header />
        </div>

        <div
      className=' w-full flex justify-center'>
        <div
      className='rounded-lg flex flex-col items-center gap-10
      dark:bg-neutral-900 bg-slate-100 px-20 py-10'>

        {/* Login Text */}
        <div
        className='
          w-full text-center font-[Jockey_one] text-6xl
          text-[#006aff]
          dark:text-[#00a6ff] '>
          Login
        </div>

        {/* Form */}
        <div className="flex flex-col">
          <label htmlFor="email"
        className='p-2 sm:w-sm not-sm:w-60 not-sm:mx-5 text-lg
        dark:text-white
        text-black
        ' >
          Email
        </label>


        <div
        className='flex align-middle'>

          <i className="bi bi-envelope-fill
          dark:text-white text-black text-xl
          border-t border-l border-b p-2 px-4 rounded-l-lg
          dark:border-[#5e5e5e] border-[#3d3d3d]" />

          <input 
          type="email"
          id='email'
          placeholder='Email'
          className='border sm:w-sm not-sm:w-60 p-2 px-4 rounded-r-lg 
          dark:border-[#5e5e5e] dark:placeholder:text-[#b9b9b9] dark:text-white
          outline-none
          border-[#3d3d3d] placeholder:text-[#5f5f5f] text-black
          '
          onChange={e => {handleForm(e)}} />

        </div>


        </div>

        
        <div className="flex flex-col">
          <label htmlFor="email"
        className='p-2 sm:w-sm not-sm:w-60 text-lg
        dark:text-white
        text-black
        ' >
          Password
        </label>

        <div
        className='flex align-middle'>

          <i className="bi bi-key-fill
          dark:text-white text-black text-xl
          border-t border-l border-b p-2 px-4 rounded-l-lg
          dark:border-[#5e5e5e] border-[#3d3d3d]" />

          <input 
          type="password"
          id='password'
          placeholder='Password'
          className='border sm:w-sm not-sm:w-60 p-2 px-4 rounded-r-lg 
          dark:border-[#5e5e5e] dark:placeholder:text-[#b9b9b9] dark:text-white
          border-[#3d3d3d] placeholder:text-[#5f5f5f] text-black outline-none
          '
          onChange={e => {handleForm(e)}} />
        </div>
        </div>


        {/* SignUp Button */}
        <div
        className='border-2 p-2 px-5 rounded-lg font-bold cursor-pointer
        dark:border-[#00a6ff] dark:text-[#00a6ff] font-[JetBrains_Mono]
        dark:hover:bg-[#00a6ff] dark:hover:text-white
        border-[#006aff] text-[#006aff]
        hover:bg-[#006aff] hover:text-white
        '
        onClick={logInUser}>
          Login
        </div>


        <Link
        to={`/register`}
        className='hover:underline dark:text-[#00a6ff] text-[#006aff]'>
          Create a account?
        </Link>

      </div>
      </div>
      </div>
    </>
  )
}

export default Login
