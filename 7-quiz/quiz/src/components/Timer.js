import {useEffect} from "react";
import {useQuiz} from "../contexts/QuizContext";

const Timer = () => {
    const {dispatch, secondsRemaining} = useQuiz()

    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;

    useEffect(() => {
        const time = setInterval(function () {
            dispatch({type: "tick"})
        }, 1000)

        return () => clearInterval(time)
    }, [dispatch]);

    return (
        <div className="timer">
            {`${mins}:${secs}`}
        </div>
    );
};

export default Timer;