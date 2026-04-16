export const loadTheme = (): 'light' | 'dark' => {
	return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
}

export const saveTheme = (theme: 'light' | 'dark'): void => {
	localStorage.setItem('theme', theme)
}
