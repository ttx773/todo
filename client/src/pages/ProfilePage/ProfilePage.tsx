import {
	Alert,
	Button,
	CircularProgress,
	Divider,
	TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
	changePassword,
	clearAuthError,
	fetchUserProfile,
	logoutUser
} from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const Wrapper = styled.div`
	min-height: 100vh;
	background: ${({ theme }) => theme.background};
	padding: 32px 16px;
`

const Container = styled.div`
	max-width: 600px;
	margin: 0 auto;
`

const Card = styled.div`
	background: ${({ theme }) => theme.surface};
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 12px;
	padding: 32px;
	margin-bottom: 24px;
`

const CardTitle = styled.h2`
	margin: 0 0 20px 0;
	font-size: 20px;
	color: ${({ theme }) => theme.text};
`

const InfoRow = styled.div`
	display: flex;
	gap: 8px;
	margin-bottom: 12px;
	font-size: 15px;
	color: ${({ theme }) => theme.text};
`

const Label = styled.span`
	font-weight: 600;
	color: ${({ theme }) => theme.textSecondary};
	min-width: 160px;
`

const BackLink = styled.button`
	background: none;
	border: none;
	color: ${({ theme }) => theme.primary};
	font-size: 14px;
	cursor: pointer;
	padding: 0;
	margin-bottom: 20px;
	&:hover {
		text-decoration: underline;
	}
`

const FieldRow = styled.div`
	margin-bottom: 16px;
`

const ProfilePage: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { user, status, error } = useAppSelector(state => state.auth)

	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [validationError, setValidationError] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	useEffect(() => {
		if (!user) {
			dispatch(fetchUserProfile())
		}
	}, [dispatch, user])

	const handleLogout = () => {
		dispatch(logoutUser())
		navigate('/login')
	}

	const validatePasswordForm = () => {
		if (oldPassword.length < 6) {
			setValidationError('Старый пароль должен содержать минимум 6 символов')
			return false
		}
		if (newPassword.length < 6) {
			setValidationError('Новый пароль должен содержать минимум 6 символов')
			return false
		}
		if (newPassword !== confirmPassword) {
			setValidationError('Новые пароли не совпадают')
			return false
		}
		setValidationError('')
		return true
	}

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validatePasswordForm()) return

		dispatch(clearAuthError())
		const result = await dispatch(changePassword({ oldPassword, newPassword }))
		if (changePassword.fulfilled.match(result)) {
			setSuccessMessage('Пароль успешно изменён')
			setOldPassword('')
			setNewPassword('')
			setConfirmPassword('')
		}
	}

	return (
		<Wrapper>
			<Container>
				<BackLink onClick={() => navigate('/')}>← Назад к задачам</BackLink>

				<Card>
					<CardTitle>Профиль</CardTitle>
					{status === 'loading' && !user && <CircularProgress size={24} />}
					{user && (
						<>
							<InfoRow>
								<Label>Email:</Label>
								<span>{user.email}</span>
							</InfoRow>
							{user.age !== undefined && (
								<InfoRow>
									<Label>Возраст:</Label>
									<span>{user.age}</span>
								</InfoRow>
							)}
							<InfoRow>
								<Label>Дата регистрации:</Label>
								<span>
									{new Date(user.createdAt).toLocaleDateString('ru-RU', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric'
									})}
								</span>
							</InfoRow>
						</>
					)}
					<Divider sx={{ my: 2 }} />
					<Button
						variant="outlined"
						color="error"
						onClick={handleLogout}
					>
						Выйти из аккаунта
					</Button>
				</Card>

				<Card>
					<CardTitle>Сменить пароль</CardTitle>
					{(error || validationError) && (
						<Alert
							severity="error"
							sx={{ mb: 2 }}
						>
							{validationError || error}
						</Alert>
					)}
					{successMessage && (
						<Alert
							severity="success"
							sx={{ mb: 2 }}
						>
							{successMessage}
						</Alert>
					)}
					<form onSubmit={handleChangePassword}>
						<FieldRow>
							<TextField
								label="Старый пароль"
								type="password"
								fullWidth
								value={oldPassword}
								onChange={e => setOldPassword(e.target.value)}
								required
							/>
						</FieldRow>
						<FieldRow>
							<TextField
								label="Новый пароль"
								type="password"
								fullWidth
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
								required
							/>
						</FieldRow>
						<FieldRow>
							<TextField
								label="Подтвердите новый пароль"
								type="password"
								fullWidth
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								required
							/>
						</FieldRow>
						<Button
							type="submit"
							variant="contained"
							disabled={status === 'loading'}
						>
							{status === 'loading' ? (
								<CircularProgress size={20} />
							) : (
								'Сохранить'
							)}
						</Button>
					</form>
				</Card>
			</Container>
		</Wrapper>
	)
}

export default ProfilePage
