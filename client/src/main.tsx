import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppThemeProvider } from './context/ThemeContext'
import { store } from './store/index'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<AppThemeProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AppThemeProvider>
	</Provider>
)
