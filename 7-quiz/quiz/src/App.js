import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";

const initialState = {
    questions: [],
    //loading, error, ready, active, finished
    status: "loading",
}

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {...state, questions: action.payload, status: "ready"};
        case "dataFailed":
            return {...state, status: "error"};
        default:
            return state;
    }
}

export default function App() {

    const [state, dispatch] = useReducer(reducer, initialState)
    const {status, questions} = state

    const numQuestions = questions.length

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("http://localhost:8000/questions");
                const data = await res.json();
                dispatch({type: "dataReceived", payload: data});
                console.log(data);
            } catch (error) {
                dispatch({type: "dataFailed"})
            }

        }

        fetchData(); // Chama a função renomeada
    }, []);

    return <div className="app">
        <Header/>
        <Main>
            {status === "loading" && <Loader/>}
            {status === "error" && <Error/>}
            {status === "ready" && <Start numQuestions={numQuestions}/>}
        </Main>
    </div>
}
