import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({ children }){
  const [theme, setTheme] = useState(() => localStorage.getItem('st_theme') || 'dark')
  useEffect(()=>{
    document.body.classList.toggle('light', theme === 'light')
    localStorage.setItem('st_theme', theme)
  }, [theme])
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
