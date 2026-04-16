import { createTheme } from '@mui/material/styles'

export const muiLightTheme = createTheme({ palette: { mode: 'light' } })
export const muiDarkTheme = createTheme({ palette: { mode: 'dark' } })

export const lightTheme = {
	mode: 'light' as const,
	background: '#f5f5f5',
	surface: '#ffffff',
	text: '#212121',
	textSecondary: '#757575',
	border: '#e0e0e0',
	primary: '#1976d2',
	error: '#d32f2f',
	icons: '#232323'
}

export const darkTheme = {
	mode: 'dark' as const,
	background: '#121212',
	surface: '#1e1e1e',
	text: '#ffffff',
	textSecondary: '#bdbdbd',
	border: '#424242',
	primary: '#3da8ff',
	error: '#d32f2f',
	icons: '#ffffff'
}
