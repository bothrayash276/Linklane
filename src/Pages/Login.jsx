import React from 'react'

const Login = () => {
  return (
    <>
      <div
      className='w-full flex flex-col align-middle justify-center'>

        {/* Login Text */}
        <div
        className='
          w-full text-center font-[Jockey_one] text-6xl
          text-[#006aff]
          dark:text-[#00a6ff] '>
          Login
        </div>

        {/* Form */}
        <input 
        type="email"
        id='email'
        placeholder='Email'
        className='border max-w-sm p-1 px-2
        dark:border-[#3f3f3f] dark:placeholder:text-[#3f3f3f]
        border-black
        ' />

      </div>
    </>
  )
}

export default Login
