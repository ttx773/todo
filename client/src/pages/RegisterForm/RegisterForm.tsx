import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { fetchUserProfile, registerUser } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const Wrapper = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({ theme }) => theme.background};
`

const Card = styled.div`
	background: ${({ theme }) => theme.surface};
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 12px;
	padding: 40px 36px;
	width: 100%;
	max-width: 400px;
`

const Title = styled.h1`
	margin: 0 0 24px 0;
	font-size: 24px;
	color: ${({ theme }) => theme.text};
	text-align: center;
`

const FieldRow = styled.div`
	margin-bottom: 16px;
`

const FooterText = styled.p`
	text-align: center;
	margin-top: 20px;
	color: ${({ theme }) => theme.textSecondary};
	font-size: 14px;

	a {
		color: ${({ theme }) => theme.primary};
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
`

const RegisterForm: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { status, error } = useAppSelector(state => state.auth)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [age, setAge] = useState('')
	const [validationError, setValidationError] = useState('')

	const validate = () => {
		if (!email.includes('@')) {
			setValidationError('Введите корректный email')
			return false
		}
		if (password.length < 6) {
			setValidationError('Пароль должен содержать минимум 6 символов')
			return false
		}
		if (age && (isNaN(Number(age)) || Number(age) <= 0)) {
			setValidationError('Введите корректный возраст')
			return false
		}
		setValidationError('')
		return true
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) return

		const payload = {
			email,
			password,
			...(age ? { age: Number(age) } : {})
		}

		const result = await dispatch(registerUser(payload))
		if (registerUser.fulfilled.match(result)) {
			await dispatch(fetchUserProfile())
			navigate('/')
		}
	}

	return (
		<Wrapper>
			<Card>
				<Title>Регистрация</Title>
				{(error || validationError) && (
					<Alert
						severity="error"
						sx={{ mb: 2 }}
					>
						{validationError || error}
					</Alert>
				)}
				<form onSubmit={handleSubmit}>
					<FieldRow>
						<TextField
							label="Email"
							type="email"
							fullWidth
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</FieldRow>
					<FieldRow>
						<TextField
							label="Пароль"
							type="password"
							fullWidth
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</FieldRow>
					<FieldRow>
						<TextField
							label="Возраст (необязательно)"
							type="number"
							fullWidth
							value={age}
							onChange={e => setAge(e.target.value)}
							inputProps={{ min: 1, max: 120 }}
						/>
					</FieldRow>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						disabled={status === 'loading'}
						sx={{ mt: 1 }}
					>
						{status === 'loading' ? (
							<CircularProgress size={22} />
						) : (
							'Зарегистрироваться'
						)}
					</Button>
				</form>
				<FooterText>
					Уже есть аккаунт? <Link to="/login">Войти</Link>
				</FooterText>
			</Card>
		</Wrapper>
	)
}

export default RegisterForm
