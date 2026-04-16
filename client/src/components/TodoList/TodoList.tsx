import {
	Alert,
	FormControl,
	InputLabel,
	MenuItem,
	Pagination,
	Select
} from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	clearError,
	fetchTodosThunk,
	setFilter,
	setLimit,
	setPage,
	setSort
} from '../../store/todoSlice'
import type { FilterType, SortOrder } from '../../types'
import TodoItem from '../TodoItem/TodoItem'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`

const Controls = styled.div`
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	align-items: center;
`

const List = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
`

const EmptyText = styled.p`
	color: ${({ theme }) => theme.textSecondary};
	text-align: center;
	margin: 20px 0;
`

const PaginationWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
`

const TotalText = styled.span`
	font-size: 13px;
	color: ${({ theme }) => theme.textSecondary};
`

const selectSx = {
	minWidth: 130,
	'& .MuiOutlinedInput-notchedOutline': { borderColor: 'inherit' }
}

const TodoList: React.FC = () => {
	const dispatch = useAppDispatch()
	const {
		todos,
		loading,
		error,
		page,
		limit,
		totalPages,
		total,
		filter,
		sort
	} = useAppSelector(s => s.todos)

	useEffect(() => {
		dispatch(fetchTodosThunk())
	}, [dispatch, page, limit, filter])

	useEffect(() => {
		if (todos.length === 0 && total > 0) {
			if (page === 1) {
				dispatch(fetchTodosThunk())
			} else {
				dispatch(setPage(1))
			}
		}
	}, [todos.length, total, page, dispatch])

	const sortedTodos = useMemo(() => {
		return [...todos].sort((a, b) => {
			const diff =
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			return sort === 'newest' ? -diff : diff
		})
	}, [todos, sort])

	return (
		<Wrapper>
			<Controls>
				<FormControl
					size="small"
					sx={selectSx}
				>
					<InputLabel>Фильтр</InputLabel>
					<Select
						value={filter}
						label="Фильтр"
						onChange={e => dispatch(setFilter(e.target.value as FilterType))}
					>
						<MenuItem value="all">Все</MenuItem>
						<MenuItem value="active">Невыполненные</MenuItem>
						<MenuItem value="completed">Выполненные</MenuItem>
					</Select>
				</FormControl>

				<FormControl
					size="small"
					sx={selectSx}
				>
					<InputLabel>Сортировка</InputLabel>
					<Select
						value={sort}
						label="Сортировка"
						onChange={e => dispatch(setSort(e.target.value as SortOrder))}
					>
						<MenuItem value="newest">Новые сначала</MenuItem>
						<MenuItem value="oldest">Старые сначала</MenuItem>
					</Select>
				</FormControl>

				<FormControl
					size="small"
					sx={{ minWidth: 110 }}
				>
					<InputLabel>На странице</InputLabel>
					<Select
						value={limit}
						label="На странице"
						onChange={e => dispatch(setLimit(Number(e.target.value)))}
					>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
					</Select>
				</FormControl>
			</Controls>

			{error && (
				<Alert
					severity="error"
					onClose={() => dispatch(clearError())}
				>
					{error}
				</Alert>
			)}

			{!loading && sortedTodos.length === 0 && (
				<EmptyText>Задачи не найдены</EmptyText>
			)}

			{sortedTodos.length > 0 && (
				<List style={{ opacity: loading ? 0.5 : 1 }}>
					{sortedTodos.map(todo => (
						<TodoItem
							key={todo.id}
							todo={todo}
						/>
					))}
				</List>
			)}

			<PaginationWrapper>
				<TotalText>Всего задач: {total}</TotalText>
				{totalPages > 1 && (
					<Pagination
						count={totalPages}
						page={page}
						onChange={(_, value) => dispatch(setPage(value))}
						color="primary"
						size="small"
					/>
				)}
			</PaginationWrapper>
		</Wrapper>
	)
}

export default TodoList
