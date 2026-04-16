import React, { useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../store/hooks'
import { addTodoThunk, fetchTodosThunk } from '../../store/todoSlice'

const Form = styled.form`
	display: flex;
	gap: 10px;
	margin-bottom: 8px;
`

const Input = styled.input`
	flex: 1;
	padding: 10px 14px;
	border-radius: 6px;
	border: 1px solid ${({ theme }) => theme.border};
	background: ${({ theme }) => theme.surface};
	color: ${({ theme }) => theme.text};
	font-size: 15px;
	outline: none;
	transition: border-color 0.2s;

	&:focus {
		border-color: ${({ theme }) => theme.primary};
	}

	&::placeholder {
		color: ${({ theme }) => theme.textSecondary};
	}
`

const AddButton = styled.button`
	padding: 10px 20px;
	border-radius: 6px;
	border: none;
	background: ${({ theme }) => theme.primary};
	color: #fff;
	font-size: 15px;
	cursor: pointer;
	white-space: nowrap;
	transition: opacity 0.2s;

	&:hover {
		opacity: 0.85;
	}
`

const ErrorText = styled.p`
	color: ${({ theme }) => theme.error};
	font-size: 13px;
	margin: 0;
`

const AddTodo: React.FC = () => {
	const dispatch = useAppDispatch()
	const [text, setText] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!text.trim()) {
			setError('Поле не может быть пустым')
			return
		}
		await dispatch(addTodoThunk(text.trim()))
		await dispatch(fetchTodosThunk())
		setText('')
		setError('')
	}

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Input
					value={text}
					onChange={e => {
						setText(e.target.value)
						if (error) setError('')
					}}
					placeholder="Введите новую задачу..."
				/>
				<AddButton type="submit">Добавить</AddButton>
			</Form>
			{error && <ErrorText>{error}</ErrorText>}
		</div>
	)
}

export default AddTodo
