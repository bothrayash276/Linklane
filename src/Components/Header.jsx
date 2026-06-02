import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    // Theme State
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const localStorageTheme = localStorage.getItem("theme") || 'light'
        setTheme(localStorageTheme)
        
        if (theme === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
        
    }, [theme])

    const handleThemeChange = () => {
        if (theme === 'dark') {
            localStorage.setItem('theme', 'light')
            setTheme('light')
        }
        else {
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        }
    }

  return (
    <>  

    <div
    className='font-[JetBrains_Mono] flex justify-between h-10 items-center px-10 mb-10'>
        <Link
        to={`/${localStorage.getItem('id')}`} 
        className='dark:text-white flex gap-3 hover:underline' >
            <i className='bi bi-house-door-fill dark:text-white text-black' />
            <span className='not-sm:hidden'>Home</span>
        </Link>

        <Link
        to={`/${localStorage.getItem('id')}/profile`}
        className='dark:text-white flex gap-3 hover:underline'>
            <i className='bi bi-person-badge dark:text-white text-black' />
            <span className='not-sm:hidden'>Profile</span>
        </Link>

        <Link
        className='dark:text-white flex gap-3 hover:underline'
        to={`/login`}>
            <i className='bi bi-lock-fill dark:text-white text-black' />
            <span className='not-sm:hidden'>Sign In</span>
        </Link>

        <i 
        onClick={handleThemeChange}
        className={`${theme ==='light' ? "" : "hidden"} bi bi-brightness-high-fill text-black text-xl`} />
        <i 
        onClick={handleThemeChange}
        className={`${theme ==='dark' ? "" : "hidden"} bi bi-moon-fill text-white`} />

    </div>

        
    </>
  )
}

export default Header
