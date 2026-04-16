import axios from 'axios'
import type { FilterType, Todo } from '../types'

const API_URL = 'http://localhost:3001'

export interface TodosResponse {
	data: Todo[]
	total: number
	page: number
	limit: number
	totalPages: number
}

export const fetchTodos = async (
	page: number,
	limit: number,
	filter: FilterType
): Promise<TodosResponse> => {
	const response = await axios.get<TodosResponse>(
		`${API_URL}/todos?page=${page}&limit=${limit}&filter=${filter}`
	)
	return response.data
}

export const createTodo = async (text: string): Promise<Todo> => {
	const response = await axios.post<Todo>(`${API_URL}/todos`, { text })
	return response.data
}

export const deleteTodo = async (id: number): Promise<void> => {
	await axios.delete(`${API_URL}/todos/${id}`)
}

export const updateTodo = async (
	id: number,
	updates: Partial<Pick<Todo, 'text' | 'completed'>>
): Promise<Todo> => {
	const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, updates)
	return response.data
}

export const toggleTodoApi = async (id: number): Promise<Todo> => {
	const response = await axios.patch<Todo>(`${API_URL}/todos/${id}/toggle`)
	return response.data
}
