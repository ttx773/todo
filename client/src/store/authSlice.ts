import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type {
	ChangePasswordPayload,
	LoginPayload,
	RegisterPayload
} from '../api/auth'
import { changePasswordApi, getMeApi, loginApi, registerApi } from '../api/auth'
import type { AuthState } from '../types'

const initialState: AuthState = {
	user: null,
	token: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
	status: 'idle',
	error: null
}

export const registerUser = createAsyncThunk(
	'auth/register',
	async (payload: RegisterPayload, { rejectWithValue }) => {
		try {
			const tokens = await registerApi(payload)
			localStorage.setItem('accessToken', tokens.accessToken)
			localStorage.setItem('refreshToken', tokens.refreshToken)
			return tokens
		} catch (err: unknown) {
			const error = err as { response?: { data?: { message?: string } } }
			return rejectWithValue(
				error.response?.data?.message ?? 'Ошибка регистрации'
			)
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/login',
	async (payload: LoginPayload, { rejectWithValue }) => {
		try {
			const tokens = await loginApi(payload)
			localStorage.setItem('accessToken', tokens.accessToken)
			localStorage.setItem('refreshToken', tokens.refreshToken)
			return tokens
		} catch (err: unknown) {
			const error = err as { response?: { data?: { message?: string } } }
			return rejectWithValue(
				error.response?.data?.message ?? 'Неверный email или пароль'
			)
		}
	}
)

export const fetchUserProfile = createAsyncThunk(
	'auth/fetchProfile',
	async (_, { rejectWithValue }) => {
		try {
			return await getMeApi()
		} catch (err: unknown) {
			const error = err as { response?: { data?: { message?: string } } }
			return rejectWithValue(
				error.response?.data?.message ?? 'Ошибка загрузки профиля'
			)
		}
	}
)

export const changePassword = createAsyncThunk(
	'auth/changePassword',
	async (payload: ChangePasswordPayload, { rejectWithValue }) => {
		try {
			await changePasswordApi(payload)
		} catch (err: unknown) {
			const error = err as { response?: { data?: { message?: string } } }
			return rejectWithValue(
				error.response?.data?.message ?? 'Ошибка смены пароля'
			)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutUser(state) {
			state.user = null
			state.token = null
			state.refreshToken = null
			state.status = 'idle'
			state.error = null
			localStorage.removeItem('accessToken')
			localStorage.removeItem('refreshToken')
		},
		clearAuthError(state) {
			state.error = null
		}
	},
	extraReducers: builder => {
		builder
			.addCase(registerUser.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'idle'
				state.token = action.payload.accessToken
				state.refreshToken = action.payload.refreshToken
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})

		builder
			.addCase(loginUser.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'idle'
				state.token = action.payload.accessToken
				state.refreshToken = action.payload.refreshToken
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})

		builder
			.addCase(fetchUserProfile.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.status = 'idle'
				state.user = action.payload
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})

		builder
			.addCase(changePassword.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(changePassword.fulfilled, state => {
				state.status = 'idle'
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
	}
})

export const { logoutUser, clearAuthError } = authSlice.actions
export default authSlice.reducer
