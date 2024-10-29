import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect, useReducer} from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import Start from "./components/Start";
import NextQuestion from "./components/NextQuestion";
import ProgressBar from "./components/ProgressBar";

const initialState = {
    questions: [],
    status: "loading",// loading, error, ready, active, finished

    index: 0,
    answer: null,
    points: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {...state, questions: action.payload, status: "ready"};
        case "dataFailed":
            return {...state, status: "error"};
        case "dataActived":
            return {...state, status: "active"};
        case "newAnswer":
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ?
                    state.points + Number(question.points) :
                    state.points,
            };

        case "nextQuestion":
            return {...state, index: state.index + 1, answer: null};
        default:
            return state;
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {status, questions, index, answer, points} = state;

    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("http://localhost:8000/questions");
                const data = await res.json();
                dispatch({type: "dataReceived", payload: data});
                console.log(data);
            } catch (error) {
                dispatch({type: "dataFailed"});
            }
        }

        fetchData();
    }, []);

    return (
        <div className="app">
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && <Start numQuestions={numQuestions} dispatch={dispatch}/>}
                {status === "active" && (
                    <>
                        <ProgressBar numQuestions={numQuestions} index={index} points={points} maxPoints={maxPoints}
                                     answer={answer}/>
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <NextQuestion dispatch={dispatch} answer={answer}/>
                    </>
                )}
            </Main>
        </div>
    );
}
