import React, { useState, useEffect } from 'react'

const Header = () => {

    // Theme State
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const localStorageTheme = localStorage.getItem("theme") || 'light'
        setTheme(localStorageTheme)
        
        if (theme === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
        
    }, [theme])

    const handleThemeChange = () => {
        console.log('work')
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
        <span onClick={handleThemeChange}>Toggle</span>
    </>
  )
}

export default Header
