import { SquarePen, Trash2 } from 'lucide-react'
import React from 'react'
import { styled, useTheme } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	removeTodoThunk,
	setEditingId,
	toggleTodoThunk
} from '../../store/todoSlice'
import type { Todo } from '../../types'
import EditTodo from '../EditTodo/EditTodo'

interface TodoItemProps {
	todo: Todo
}

const Item = styled.li<{ $completed: boolean }>`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px 14px;
	background: ${({ theme }) => theme.surface};
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 6px;
	text-decoration: ${({ $completed }) =>
		$completed ? 'line-through' : 'none'};
	opacity: ${({ $completed }) => ($completed ? 0.7 : 1)};
	transition: background 0.2s;
`

const Checkbox = styled.input`
	width: 18px;
	height: 18px;
	cursor: pointer;
	accent-color: ${({ theme }) => theme.primary};
`

const Text = styled.span`
	flex: 1;
	font-size: 15px;
	color: ${({ theme }) => theme.text};
	word-break: break-word;
`

const Date = styled.span`
	font-size: 11px;
	color: ${({ theme }) => theme.textSecondary};
	white-space: nowrap;
`

const ActionButton = styled.button<{ $danger?: boolean }>`
	padding: 5px 12px;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	font-size: 13px;
	background: unset;
	border: ${({ theme, $danger }) =>
		$danger ? `1px solid ${theme.error}` : `1px solid ${theme.border}`};
	color: ${({ theme, $danger }) => ($danger ? '#fff' : theme.text)};
	transition: opacity 0.2s;
	white-space: nowrap;

	&:hover {
		opacity: 0.8;
	}
`

const EditWrapper = styled.div`
	padding: 10px 14px;
	background: ${({ theme }) => theme.surface};
	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 6px;
`
const iconsSvg = {
	display: 'flex',
	alignItems: 'center'
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	const dispatch = useAppDispatch()
	const editingId = useAppSelector(s => s.todos.editingId)
	const isEditing = editingId === todo.id
	const theme = useTheme()

	const formattedDate = new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}).format(new window.Date(todo.createdAt))

	if (isEditing) {
		return (
			<EditWrapper>
				<EditTodo
					id={todo.id}
					currentText={todo.text}
				/>
			</EditWrapper>
		)
	}

	return (
		<Item $completed={todo.completed}>
			<Checkbox
				type="checkbox"
				checked={todo.completed}
				onChange={() => dispatch(toggleTodoThunk(todo.id))}
			/>
			<Text>{todo.text}</Text>
			<Date>{formattedDate}</Date>
			<ActionButton onClick={() => dispatch(setEditingId(todo.id))}>
				<SquarePen
					size={16}
					style={iconsSvg}
					color={theme.icons}
					strokeWidth={1}
				/>
			</ActionButton>
			<ActionButton
				$danger
				onClick={() => dispatch(removeTodoThunk(todo.id))}
			>
				<Trash2
					size={16}
					style={iconsSvg}
					color={theme.icons}
					strokeWidth={1}
				/>
			</ActionButton>
		</Item>
	)
}

export default TodoItem
