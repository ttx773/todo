import { CircleUser, Moon, SquareArrowRightExit, Sun } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AddTodo from '../../components/AddTodo/AddTodo'
import TodoList from '../../components/TodoList/TodoList'
import { useThemeMode } from '../../context/useThemeMode'
import { logoutUser } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const Container = styled.div`
	max-width: 740px;
	margin: 0 auto;
	padding: 32px 16px;
`

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24px;
`

const Title = styled.h1`
	margin: 0;
	font-size: 26px;
	color: ${({ theme }) => theme.text};
`

const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`

const ThemeToggle = styled.button`
	background: ${({ theme }) => theme.surface};
	border: 1px solid ${({ theme }) => theme.border};
	color: ${({ theme }) => theme.text};
	padding: 8px 16px;
	border-radius: 20px;
	cursor: pointer;z
	transition: background 0.2s;
	display: flex;
	align-items: center;
	&:hover {
		background: ${({ theme }) => theme.border};
	}
`

const ProfileLink = styled(Link)`
	background: ${({ theme }) => theme.surface};
	border: 1px solid ${({ theme }) => theme.border};
	color: ${({ theme }) => theme.text};
	padding: 8px 16px;
	border-radius: 20px;
	cursor: pointer;
	transition: background 0.2s;
	text-decoration: none;
	display: flex;
	align-items: center;
	gap: 8px;
	&:hover {
		background: ${({ theme }) => theme.border};
	}
`

const Divider = styled.hr`
	border: none;
	border-top: 1px solid ${({ theme }) => theme.border};
	margin: 20px 0;
`

export const HomePage: React.FC = () => {
	const { themeMode, toggleTheme } = useThemeMode()
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.auth.user)

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<Container>
			<Header>
				<Title>Todo App</Title>
				<HeaderRight>
					<ProfileLink to="/profile">
						<CircleUser size={16} />
						{user && (
							<span style={{ fontSize: 12, opacity: 0.7 }}>{user.email}</span>
						)}
					</ProfileLink>
					<ThemeToggle onClick={toggleTheme}>
						{themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
					</ThemeToggle>
					<ThemeToggle
						onClick={handleLogout}
						style={{ color: 'red' }}
					>
						<SquareArrowRightExit size={16} />
					</ThemeToggle>
				</HeaderRight>
			</Header>
			<AddTodo />
			<Divider />
			<TodoList />
		</Container>
	)
}
