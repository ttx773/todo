import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import {
	darkTheme,
	lightTheme,
	muiDarkTheme,
	muiLightTheme
} from '../styles/themes'
import { loadTheme, saveTheme } from '../utils/localStorage'
import { ThemeContext } from './themeContextDef'

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>(loadTheme)

	const toggleTheme = () => {
		const next = themeMode === 'light' ? 'dark' : 'light'
		setThemeMode(next)
		saveTheme(next)
	}

	return (
		<ThemeContext.Provider value={{ themeMode, toggleTheme }}>
			<MuiThemeProvider
				theme={themeMode === 'light' ? muiLightTheme : muiDarkTheme}
			>
				<ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
					{children}
				</ThemeProvider>
			</MuiThemeProvider>
		</ThemeContext.Provider>
	)
}
