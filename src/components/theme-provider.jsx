import { createContext, useContext, useState, useEffect } from 'react'

    const ThemeContext = createContext()

    export function ThemeProvider({ children, defaultTheme = 'light', storageKey = 'beryl-theme' }) {
      const [theme, setTheme] = useState(getInitialTheme)

      useEffect(() => {
        localStorage.setItem(storageKey, theme)
      }, [theme, storageKey])

      function getInitialTheme() {
        try {
          const storedTheme = localStorage.getItem(storageKey)
          if (storedTheme) {
            return storedTheme
          }
          return defaultTheme
        } catch (e) {
          return defaultTheme
        }
      }

      return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
        </ThemeContext.Provider>
      )
    }

    export function useTheme() {
      return useContext(ThemeContext)
    }
