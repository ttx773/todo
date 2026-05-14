import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import GuestRoute from './components/GuestRoute/GuestRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { HomePage } from './pages/Home/HomePage'
import LoginForm from './pages/LoginForm/LoginForm'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import RegisterForm from './pages/RegisterForm/RegisterForm'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background 0.3s, color 0.3s;
  }
`

const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<GuestRoute>
							<LoginForm />
						</GuestRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<GuestRoute>
							<RegisterForm />
						</GuestRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Routes>
		</>
	)
}

export default App
