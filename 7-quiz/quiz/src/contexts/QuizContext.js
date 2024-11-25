import {createContext, useContext, useEffect, useReducer} from "react";

const QuizContext = createContext();

const initialState = {
    questions: [],
    status: "loading",// loading, error, ready, active, finished

    index: 0,
    answer: null,
    points: 0,
    highscore: JSON.parse(Number(localStorage.getItem("highscore"))) || 0,
    secondsRemaining: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {...state, questions: action.payload, status: "ready"};
        case "dataFailed":
            return {...state, status: "error"};
        case "dataActived":
            return {...state, status: "active", secondsRemaining: state.questions.length * 20};
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
        case "finishQuiz":
            return {
                ...state,
                status: "finished",
                highscore: state.points > state.highscore ? state.points : state.highscore
            };
        case "restartQuiz":
            return {...initialState, questions: state.questions, status: "ready", highscore: state.highscore};
        case "tick":
            return {
                ...state, secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status
            };
        default:
            return state;
    }
}

function QuizContextProvider({children}) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const {status, questions, index, answer, points, highscore, secondsRemaining} = state;

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

    useEffect(() => {
        localStorage.setItem("highscore", JSON.stringify(highscore));
    }, [highscore]);


    return <QuizContext.Provider value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPoints,
    }}>{children}</QuizContext.Provider>;
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === null) throw new Error("useQuiz");
    return useContext(QuizContext);
}

export {useQuiz, QuizContextProvider};