import 'styled-components'

declare module 'styled-components' {
	export interface DefaultTheme {
		mode: 'light' | 'dark'
		background: string
		surface: string
		text: string
		textSecondary: string
		border: string
		primary: string
		error: string
		icons: string
	}
}
