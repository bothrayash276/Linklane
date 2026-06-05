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
  const [invalid, setInvalid] = useState(false)

  const navigate = useNavigate()

  // Fxn to handle form
  const handleForm = e => {
    setInvalid(false)
    if (e.target.id === 'email') setEmail(e.target.value)
    else if (e.target.id === 'password') setPassword(e.target.value)
  }

  // Function to login the user
  const logInUser = async () => {
    const result = await userLogin(email, password)
    if (result[0]) {
      localStorage.setItem('id', result[1])
      navigate(`/${result[1]}`)
    }
    else {
      setInvalid(true)
    }
  }

  return (
    <>
      <div
      className='min-h-screen px-10 py-5 overflow-hidden'>

        {/* Loading Header */}
        <div
        className='w-full'>
          <Header />
        </div>

        <div
      className=' w-full flex justify-center'>
        <div
      className='rounded-lg flex flex-col items-center gap-10
       px-20 py-10'>

        {/* Login Text */}
        <div
        className='
          w-full text-center font-[Jockey_one] text-6xl
          text-[#a7cf4a] '>
          Login
        </div>

        {/* Form */}
        <div className="flex flex-col">
          <label htmlFor="email"
        className='p-2 sm:w-sm not-sm:w-60 not-sm:mx-5 text-lg
        text-white      
        ' >
          Email
        </label>


        <div
        className='flex align-middle'>

          <i className="bi bi-envelope-fill
          text-white text-xl bg-neutral-950/75
          border-t border-l border-b p-2 px-4 rounded-l-lg
          border-[#5e5e5e]" />

          <input 
          type="email"
          id='email'
          placeholder='Email'
          className='border sm:w-sm not-sm:w-60 p-2 px-4 rounded-r-lg 
          border-[#5e5e5e] dark:placeholder:text-[#b9b9b9] text-white
          outline-none bg-neutral-950/75
           placeholder:text-[#5f5f5f] 
          '
          onChange={e => {handleForm(e)}} />

        </div>


        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password"
        className='p-2 sm:w-sm not-sm:w-60 text-lg
        text-white
        ' >
          Password
        </label>

        <div
        className='flex align-middle'>

          <i className="bi bi-key-fill
          text-white  text-xl bg-neutral-950/75
          border-t border-l border-b p-2 px-4 rounded-l-lg
          border-[#5e5e5e]" />

          <input 
          type="password"
          id='password'
          placeholder='Password'
          className='border sm:w-sm not-sm:w-60 p-2 px-4 rounded-r-lg 
          border-[#5e5e5e] placeholder:text-[#b9b9b9] text-white
             outline-none bg-neutral-950/75
          '
          onChange={e => {handleForm(e)}} />
        </div>
        </div>

        {/* Invalid Credentials Tag */}
        <div
        className={`text-red-600 flex gap-3 ${invalid ? " " : "hidden"}`}>
          <i className='bi bi-exclamation-triangle-fill text-lg' />
          Invalid Credentials
        </div>

        {/* SignUp Button */}
        <div
        className='border-2 p-2 px-5 rounded-lg font-bold cursor-pointer
       text-[#a7cf4a] font-[JetBrains_Mono]
        border-[#a7cf4a]
        hover:bg-[#a7cf4a] hover:text-white
        '
        onClick={logInUser}>
          Login
        </div>

        {/* Button to redirect to register page */}
        <Link
        to={`/register`}
        className='hover:underline  text-[#a7cf4a]'>
          Create a account?
        </Link>

      </div>
      </div>
      </div>
    </>
  )
}

export default Login
