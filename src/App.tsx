import { MouseEvent, useState } from "react"
import QuestionCard from "./components/QuestionCard"
import { Answer } from "./interfaces/questions.interfaces"

import {
	QuestionState,
	Difficulty,
	fetchQuizQuestions,
} from "./services/apiQuestions"

import { GlobalStyle, Wrapper } from "./styles/App.styles"

const TOTAL_QUESTIONS = 10

function App() {
	const [loading, setLoading] = useState(false)
	const [questions, setQuestions] = useState<QuestionState[]>([])
	const [number, setNumber] = useState(0)
	const [userAnswers, setUserAnswers] = useState<Answer[]>([])
	const [score, setScore] = useState(0)
	const [playing, setPlaying] = useState(false)

	const startTrivia = async () => {
		setLoading(true)

		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			Difficulty.EASY
		)

		console.log({ newQuestions })

		setQuestions(newQuestions)
		setPlaying(true)
		setLoading(false)
	}

	const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
		const answer = e.currentTarget.value
		const correct = questions[number].correct_answer === answer
		if (correct) setScore(prev => prev + 1)
		const answerObj = {
			question: questions[number].question,
			answer,
			correct,
			correctAnswer: questions[number].correct_answer,
		}
		setUserAnswers(prev => [...prev, answerObj])
	}

	const nextQuestion = () => {
		const next = number + 1
		if (next === TOTAL_QUESTIONS) {
			setPlaying(false)
		} else {
			setNumber(next)
		}
	}

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<h1>REACT QUIZ</h1>

				{loading && <p>Loading Questions...</p>}

				{!playing && (
					<button className='start' onClick={startTrivia}>
						Start
					</button>
				)}

				{playing && (
					<>
						<p className='score'>Score: {score}</p>

						<QuestionCard
							questionNr={number + 1}
							totalQuestions={TOTAL_QUESTIONS}
							question={questions[number].question}
							answers={questions[number].answers}
							userAnswer={userAnswers ? userAnswers[number] : undefined}
							callback={checkAnswer}
						/>

						{userAnswers.length === number + 1 &&
							number !== TOTAL_QUESTIONS - 1 && (
								<button className='next' onClick={nextQuestion}>
									Next Question
								</button>
							)}
					</>
				)}
			</Wrapper>
		</>
	)
}

export default App
