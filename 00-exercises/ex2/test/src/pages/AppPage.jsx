import React, {useReducer, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const initialState = {
    saldo: Number(localStorage.getItem("saldo")) || 0,
    emprestimo: Number(localStorage.getItem("emprestimo")) || 0,
}

function reducer(state, action) {
    switch (action.type) {
        case "add":
            return {
                ...state, saldo: state.saldo + action.payload,
            }
        case "emprestimo":
            return {
                ...state, emprestimo: state.emprestimo + action.payload,
            }
        case "pagarEmp":
            return state.saldo >= state.emprestimo
                ? {
                    ...state,
                    saldo: state.saldo - state.emprestimo,  // Subtrai o valor do saldo
                    emprestimo: 0,  // Zera o empréstimo após o pagamento
                }
                : state;
        case "out":
            return {
                ...state, saldo: state.saldo - action.payload,
            }
        default:
            return state;
    }
}

const AppPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {saldo, emprestimo} = state;
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("saldo", saldo);
        localStorage.setItem("emprestimo", emprestimo);
    }, [saldo, emprestimo]);

    return (
        <>
            <h1>Bem-vindo à sua conta</h1>

            <p>Saldo: {saldo}</p>
            <p>Empréstimo: {emprestimo}</p>

            <p>
                <button onClick={() => dispatch({type: "add", payload: 300})}>
                    Adicionar 300
                </button>
            </p>

            <p>
                <button onClick={() => dispatch({type: "out", payload: 50})}>
                    Retirar 50
                </button>
            </p>

            <p>
                <button onClick={() => dispatch({type: "emprestimo", payload: 1000})}>
                    Empréstimo de 1000
                </button>
            </p>

            <p>
                <button onClick={() => dispatch({type: "pagarEmp"})}>
                    Pagar o empréstimo
                </button>
            </p>

            <p>
                <button onClick={() => {
                    if (emprestimo === 0 && saldo === 0) {
                        navigate("/");
                    } else {
                        alert("Para fechar a conta, o saldo e o empréstimo devem ser zero.");
                    }
                }}>
                    Fechar conta
                </button>
            </p>
        </>
    );
};

export default AppPage;
