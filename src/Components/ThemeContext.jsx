import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light")
    const [page, setPage] = useState(0)
    const colorCode = {
        '233, 207, 246' : '#bd3afa',
        '41, 202, 219' : '#29CADB',
        '176, 239, 188' : '#2f9f44'
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme, page, setPage, colorCode}}>
            {children}
        </ThemeContext.Provider>
    )
}
