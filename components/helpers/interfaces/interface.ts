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
	name: string
	description?: string
	questions: Question[]
	is_active?: boolean
}
