import QuestionsList from "./QuestionsList";
import {useQuiz} from "../contexts/QuizContext";

const Question = ({question}) => {
    const {dispatch, answer} = useQuiz()

    return (
        <div>
            <h4>{question.question}</h4>

            <QuestionsList question={question}/>
        </div>
    );
};

export default Question;