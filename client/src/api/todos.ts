import type { FilterType, Todo } from '../types'
import apiClient from './axiosInstance'

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
	const response = await apiClient.get<TodosResponse>(
		`/todos?page=${page}&limit=${limit}&filter=${filter}`
	)
	return response.data
}

export const createTodo = async (text: string): Promise<Todo> => {
	const response = await apiClient.post<Todo>('/todos', { text })
	return response.data
}

export const deleteTodo = async (id: number): Promise<void> => {
	await apiClient.delete(`/todos/${id}`)
}

export const updateTodo = async (
	id: number,
	updates: Partial<Pick<Todo, 'text' | 'completed'>>
): Promise<Todo> => {
	const response = await apiClient.put<Todo>(`/todos/${id}`, updates)
	return response.data
}

export const toggleTodoApi = async (id: number): Promise<Todo> => {
	const response = await apiClient.patch<Todo>(`/todos/${id}/toggle`)
	return response.data
}
