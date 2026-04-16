import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { AppThemeProvider } from './context/ThemeContext'
import { store } from './store/index'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<AppThemeProvider>
				<App />
			</AppThemeProvider>
		</Provider>
	</StrictMode>
)
