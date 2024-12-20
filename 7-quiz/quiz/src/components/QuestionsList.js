import {useQuiz} from "../contexts/QuizContext";

const QuestionsList = ({question}) => {

    const {answer, dispatch} = useQuiz()

    const hasAnswer = answer !== null

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${index === answer ? "answer" : ""} 
                    ${hasAnswer ?
                        index === question.correctOption ?
                            "correct" : "wrong"
                        : ""
                    }`}
                    key={index}
                    disabled={hasAnswer}
                    onClick={() => dispatch({type: "newAnswer", payload: index})}>{option}</button>
            ))}
        </div>
    );
};

export default QuestionsList;