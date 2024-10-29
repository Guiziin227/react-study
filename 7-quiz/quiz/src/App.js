import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect, useReducer} from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import Start from "./components/Start";

const initialState = {
    questions: [],
    status: "loading",// loading, error, ready, active, finished

    index: 0,
    answer: null,
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
            return {...state, answer: action.payload};
        default:
            return state;
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {status, questions, index, answer} = state;

    const numQuestions = questions.length;


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
                {status === "active" && <Question
                    question={questions[index]}
                    dispatch={dispatch}
                    answer={answer}
                />}
            </Main>
        </div>
    );
}
