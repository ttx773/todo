import type React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

interface GuestRouteProps {
	children: React.ReactNode
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
	const token = useAppSelector(state => state.auth.token)
	if (token) {
		return (
			<Navigate
				to="/"
				replace
			/>
		)
	}
	return <>{children}</>
}

export default GuestRoute
