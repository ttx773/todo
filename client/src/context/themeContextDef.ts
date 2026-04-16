import { createContext } from 'react'

export interface ThemeContextType {
	themeMode: 'light' | 'dark'
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
	themeMode: 'light',
	toggleTheme: () => {}
})
