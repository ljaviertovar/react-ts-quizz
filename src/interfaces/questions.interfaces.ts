export interface Answer {
	question: string
	answer: string
	correct: boolean
	correctAnswer: string
}

export interface Question {
	category: string
	correct_answer: string
	incorrect_answers: string[]
	question: string
	type: string
}
