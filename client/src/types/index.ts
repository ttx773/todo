export interface Todo {
	id: number
	text: string
	completed: boolean
	createdAt: string
}

export type SortOrder = 'newest' | 'oldest'

export type FilterType = 'all' | 'active' | 'completed'
