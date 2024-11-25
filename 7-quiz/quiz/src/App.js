import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import Start from "./components/Start";
import NextQuestion from "./components/NextQuestion";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import Restart from "./components/Restart";
import Timer from "./components/Timer";
import {useQuiz} from "./contexts/QuizContext";


export default function App() {

    const {
        status,
        questions,
        index,
        points,
        answer,
        highscore,
        secondsRemaining,
        dispatch,
        maxPoints,
        numQuestions
    } = useQuiz()


    return (
        <div className="app">
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && <Start/>}
                {status === "active" && (
                    <>
                        <ProgressBar/>
                        <Question
                            question={questions[index]}
                        />
                        <Timer/>
                        <NextQuestion/>
                    </>
                )}
                {status === "finished" && (<> <FinishScreen/>
                    <Restart/>
                </>)}
            </Main>
        </div>
    );
}
