import {useQuiz} from "../contexts/QuizContext";

const Restart = () => {
    const {dispatch} = useQuiz()
    return (
        <button className="btn btn-toggle" onClick={() => dispatch({type: 'restartQuiz'})}>
            Restart
        </button>
    );
};

export default Restart;