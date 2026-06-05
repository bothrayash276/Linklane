import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()


  return (
    <>  

    <div
    className='font-[JetBrains_Mono] flex justify-between h-10 items-center px-10 sm:mb-10'>

        {/* Home Button Link */}
        <Link
        to={`/${localStorage.getItem('id')}`} 
        className='text-white flex gap-3 hover:underline' >
            <i className='bi bi-house-door-fill text-white' />
            <span className='not-sm:hidden'>Home</span>
        </Link>

        {/*  Profile Link */}
        <Link
        to={`/${localStorage.getItem('id')}/profile`}
        className='text-white flex gap-3 hover:underline'>
            <i className='bi bi-person-badge text-white ' />
            <span className='not-sm:hidden'>Profile</span>
        </Link>

        {/* Sign in link */}
        <Link
        className='text-white flex gap-3 hover:underline'
        to={`/login`}>
            <i className='bi bi-lock-fill text-white ' />
            <span className='not-sm:hidden'>Sign In</span>
        </Link>

    </div>

        
    </>
  )
}

export default Header
