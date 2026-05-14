interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: string
}

type SortOrder = 'newest' | 'oldest'

type FilterType = 'all' | 'active' | 'completed'

interface User {
	id: number
	email: string
	age?: number
	createdAt: string
}

interface AuthTokens {
	accessToken: string
	refreshToken: string
}

interface AuthState {
	user: User | null
	token: string | null
	refreshToken: string | null
	status: 'idle' | 'loading' | 'failed'
	error: string | null
}

export type { AuthState, AuthTokens, FilterType, SortOrder, Todo, User }
