import { FC, MouseEvent } from "react"
import { Wrapper, ButtomWrapper } from "./QuestionCard.styles"
import { Answer } from "../interfaces/questions.interfaces"

interface Props {
	question: string
	answers: string[]
	callback: (e: MouseEvent<HTMLButtonElement>) => void
	userAnswer: any
	questionNr: number
	totalQuestions: number
}

const QuestionCard: FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNr,
	totalQuestions,
}) => {
	return (
		<Wrapper>
			<p className='number'>
				question: {questionNr} / {totalQuestions}
			</p>
			<p dangerouslySetInnerHTML={{ __html: question }} />
			<div>
				{answers.map(answer => (
					<ButtomWrapper
						key={answer}
						correct={userAnswer?.correctAnswer === answer}
						userClicked={userAnswer?.answer === answer}
					>
						<button disabled={userAnswer} value={answer} onClick={callback}>
							<span dangerouslySetInnerHTML={{ __html: answer }}></span>
						</button>
					</ButtomWrapper>
				))}
			</div>
		</Wrapper>
	)
}

export default QuestionCard
