import React, { useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../store/hooks'
import { editTodoThunk, setEditingId } from '../../store/todoSlice'

interface EditTodoProps {
	id: number
	currentText: string
}

const Form = styled.form`
	display: flex;
	gap: 8px;
	width: 100%;
`

const Input = styled.input`
	flex: 1;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${({ theme }) => theme.border};
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	font-size: 14px;
	outline: none;

	&:focus {
		border-color: ${({ theme }) => theme.primary};
	}
`

const Button = styled.button<{ variant?: 'cancel' }>`
	padding: 6px 14px;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	font-size: 14px;
	background: ${({ theme, variant }) =>
		variant === 'cancel' ? theme.border : theme.primary};
	color: ${({ theme, variant }) =>
		variant === 'cancel' ? theme.text : '#fff'};

	&:hover {
		opacity: 0.85;
	}
`

const ErrorText = styled.span`
	color: ${({ theme }) => theme.error};
	font-size: 12px;
`

const EditTodo: React.FC<EditTodoProps> = ({ id, currentText }) => {
	const dispatch = useAppDispatch()
	const [text, setText] = useState(currentText)
	const [error, setError] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!text.trim()) {
			setError('Поле не может быть пустым')
			return
		}
		dispatch(editTodoThunk({ id, text: text.trim() }))
	}

	const handleCancel = () => {
		dispatch(setEditingId(null))
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
					autoFocus
				/>
				<Button type="submit">Сохранить</Button>
				<Button
					type="button"
					variant="cancel"
					onClick={handleCancel}
				>
					Отмена
				</Button>
			</Form>
			{error && <ErrorText>{error}</ErrorText>}
		</div>
	)
}

export default EditTodo
