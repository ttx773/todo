import { Moon, Sun } from 'lucide-react'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'
import { useThemeMode } from './context/useThemeMode'

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

const ThemeToggle = styled.button`
	background: ${({ theme }) => theme.surface};
	border: 1px solid ${({ theme }) => theme.border};
	color: ${({ theme }) => theme.text};
	padding: 8px 16px;
	border-radius: 20px;
	cursor: pointer;
	font-size: 14px;
	transition: background 0.2s;
	&:hover {
		background: ${({ theme }) => theme.border};
	}
`

const Divider = styled.hr`
	border: none;
	border-top: 1px solid ${({ theme }) => theme.border};
	margin: 20px 0;
`

const App: React.FC = () => {
	const { themeMode, toggleTheme } = useThemeMode()
	return (
		<>
			<GlobalStyle />
			<Container>
				<Header>
					<Title>Todo App</Title>
					<ThemeToggle onClick={toggleTheme}>
						{themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
					</ThemeToggle>
				</Header>
				<AddTodo />
				<Divider />
				<TodoList />
			</Container>
		</>
	)
}

export default App
