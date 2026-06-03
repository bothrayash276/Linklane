import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light")
    const [page, setPage] = useState(0)

    return (
        <ThemeContext.Provider value={{theme, setTheme, page, setPage}}>
            {children}
        </ThemeContext.Provider>
    )
}
