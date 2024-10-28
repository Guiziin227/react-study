import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";

const initialState = {
    quetions: [],
    //loading, error, ready, active, finished
    status: "loading",
}

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {...state, quetions: action.payload, status: "ready"};
        case "dataFailed":
            return {...state, status: "error"};
        default:
            return state;
    }
}

export default function App() {

    const [state, dispatch] = useReducer(reducer, initialState)

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
        <Main/>
    </div>
}
