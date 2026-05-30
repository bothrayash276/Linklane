import React, { useState } from 'react'

const Login = () => {

  // Form State
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Fxn to handle form
  const handleForm = e => {
    if (e.target.id === 'email') setEmail(e.target.value)
    else if (e.target.id === 'password') setPassword(e.target.value)
  }

  return (
    <>
      <div
      className='w-full min-h-screen flex flex-col items-center justify-center gap-10'>

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
        className='p-2 sm:w-sm not-sm:w-[20rem] not-sm:mx-5 text-lg
        dark:text-white
        text-black
        ' >
          Email
        </label>

        <input 
        type="email"
        id='email'
        placeholder='Email'
        className='border sm:w-sm not-sm:w-[20rem] not-sm:mx-5 p-2 px-4 rounded-lg 
        dark:border-[#5e5e5e] dark:placeholder:text-[#b9b9b9] dark:text-white
        dark:outline-white outline-black
        border-[#3d3d3d] placeholder:text-[#5f5f5f] text-black
        '
        onClick={e => {handleForm(e)}} />
        </div>

        
        <div className="flex flex-col">
          <label htmlFor="email"
        className='p-2 sm:w-sm not-sm:w-[20rem] not-sm:mx-5 text-lg
        dark:text-white
        text-black
        ' >
          Password
        </label>

        <input 
        type="password"
        id='password'
        placeholder='Password'
        className='border sm:w-sm not-sm:w-[20rem] not-sm:mx-5 p-2 px-4 rounded-lg 
        dark:border-[#5e5e5e] dark:placeholder:text-[#b9b9b9] dark:text-white
        dark:outline-white outline-black
        border-[#3d3d3d] placeholder:text-[#5f5f5f] text-black
        '
        onClick={e => {handleForm(e)}} />
        </div>


        {/* SignUp Button */}
        <div
        className='border-2 p-2 px-5 rounded-lg font-bold cursor-pointer
        dark:border-[#00a6ff] dark:text-[#00a6ff] font-[JetBrains_Mono]
        dark:hover:bg-[#00a6ff] dark:hover:text-white
        border-[#006aff] text-[#006aff]
        hover:bg-[#006aff] hover:text-white
        '>
          Sign Up
        </div>

      </div>
    </>
  )
}

export default Login
