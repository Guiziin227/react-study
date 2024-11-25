const QuestionsList = ({question, dispatch, answer}) => {

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