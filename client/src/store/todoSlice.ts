import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../api/todos'
import type { FilterType, SortOrder, Todo } from '../types'

interface TodoState {
	todos: Todo[]
	loading: boolean
	error: string | null
	page: number
	limit: number
	totalPages: number
	total: number
	filter: FilterType
	sort: SortOrder
	editingId: number | null
}

const initialState: TodoState = {
	todos: [],
	loading: false,
	error: null,
	page: 1,
	limit: 10,
	totalPages: 1,
	total: 0,
	filter: 'all',
	sort: 'newest',
	editingId: null
}

export const fetchTodosThunk = createAsyncThunk(
	'todos/fetchAll',
	async (_, { getState, rejectWithValue }) => {
		const state = (getState() as { todos: TodoState }).todos
		try {
			return await api.fetchTodos(state.page, state.limit, state.filter)
		} catch (err: unknown) {
			const error = err as { response?: { data?: { error?: string } } }
			return rejectWithValue(
				error.response?.data?.error ?? 'Ошибка загрузки задач'
			)
		}
	}
)

export const addTodoThunk = createAsyncThunk(
	'todos/add',
	async (text: string, { rejectWithValue }) => {
		try {
			return await api.createTodo(text)
		} catch (err: unknown) {
			const error = err as { response?: { data?: { error?: string } } }
			return rejectWithValue(
				error.response?.data?.error ?? 'Ошибка добавления задачи'
			)
		}
	}
)

export const removeTodoThunk = createAsyncThunk(
	'todos/remove',
	async (id: number, { rejectWithValue }) => {
		try {
			await api.deleteTodo(id)
			return id
		} catch (err: unknown) {
			const error = err as { response?: { data?: { error?: string } } }
			return rejectWithValue(
				error.response?.data?.error ?? 'Ошибка удаления задачи'
			)
		}
	}
)

export const toggleTodoThunk = createAsyncThunk(
	'todos/toggle',
	async (id: number, { rejectWithValue }) => {
		try {
			return await api.toggleTodoApi(id)
		} catch (err: unknown) {
			const error = err as { response?: { data?: { error?: string } } }
			return rejectWithValue(
				error.response?.data?.error ?? 'Ошибка обновления задачи'
			)
		}
	}
)

export const editTodoThunk = createAsyncThunk(
	'todos/edit',
	async ({ id, text }: { id: number; text: string }, { rejectWithValue }) => {
		try {
			return await api.updateTodo(id, { text })
		} catch (err: unknown) {
			const error = err as { response?: { data?: { error?: string } } }
			return rejectWithValue(
				error.response?.data?.error ?? 'Ошибка редактирования задачи'
			)
		}
	}
)

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
		setLimit(state, action: PayloadAction<number>) {
			state.limit = action.payload
			state.page = 1
		},
		setFilter(state, action: PayloadAction<FilterType>) {
			state.filter = action.payload
			state.page = 1
		},
		setSort(state, action: PayloadAction<SortOrder>) {
			state.sort = action.payload
		},
		setEditingId(state, action: PayloadAction<number | null>) {
			state.editingId = action.payload
		},
		clearError(state) {
			state.error = null
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTodosThunk.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchTodosThunk.fulfilled, (state, action) => {
				state.loading = false
				state.todos = action.payload.data
				state.total = action.payload.total
				state.totalPages = action.payload.totalPages
			})
			.addCase(fetchTodosThunk.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(addTodoThunk.pending, state => {
				state.error = null
			})
			.addCase(addTodoThunk.rejected, (state, action) => {
				state.error = action.payload as string
			})
			.addCase(removeTodoThunk.fulfilled, (state, action) => {
				state.todos = state.todos.filter(t => t.id !== action.payload)
				state.total = Math.max(0, state.total - 1)
			})
			.addCase(removeTodoThunk.rejected, (state, action) => {
				state.error = action.payload as string
			})
			.addCase(toggleTodoThunk.fulfilled, (state, action) => {
				const idx = state.todos.findIndex(t => t.id === action.payload.id)
				if (idx !== -1) state.todos[idx] = action.payload
			})
			.addCase(toggleTodoThunk.rejected, (state, action) => {
				state.error = action.payload as string
			})
			.addCase(editTodoThunk.fulfilled, (state, action) => {
				const idx = state.todos.findIndex(t => t.id === action.payload.id)
				if (idx !== -1) state.todos[idx] = action.payload
				state.editingId = null
			})
			.addCase(editTodoThunk.rejected, (state, action) => {
				state.error = action.payload as string
			})
	}
})

export const {
	setPage,
	setLimit,
	setFilter,
	setSort,
	setEditingId,
	clearError
} = todoSlice.actions

export default todoSlice.reducer
