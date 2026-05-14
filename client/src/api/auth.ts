import type { AuthTokens, User } from '../types'
import apiClient from './axiosInstance'

export interface RegisterPayload {
	email: string
	password: string
	age?: number
}

export interface LoginPayload {
	email: string
	password: string
}

export interface ChangePasswordPayload {
	oldPassword: string
	newPassword: string
}

export const registerApi = async (
	payload: RegisterPayload
): Promise<AuthTokens> => {
	const response = await apiClient.post<AuthTokens>('/auth/register', payload)
	return response.data
}

export const loginApi = async (payload: LoginPayload): Promise<AuthTokens> => {
	const response = await apiClient.post<AuthTokens>('/auth/login', payload)
	return response.data
}

export const getMeApi = async (): Promise<User> => {
	const response = await apiClient.get<User>('/auth/me')
	return response.data
}

export const changePasswordApi = async (
	payload: ChangePasswordPayload
): Promise<void> => {
	await apiClient.post('/auth/change-password', payload)
}
