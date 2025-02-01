export interface Variant {
	ID?: number
	name: string
	is_correct: boolean
}

export interface Question {
	ID?: number
	name: string
	description?: string
	variants: Variant[]
}

export interface Test {
	ID?: number
	user_login?: string
	name: string
	description?: string
	questions: Question[]
	is_active?: boolean
	user_role?: string
	count_user_past?: number
	one_question_one_answer?: boolean
}

export interface User {
	id?: number
	login: string
	password: string
	email: string
	name: string
	avatar?: string
}
