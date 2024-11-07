import React, {useReducer, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const initialState = { //Criano um estado iniciais e settando para iniciar em 0, caso nao tenha valor salvo
    saldo: Number(localStorage.getItem("saldo")) || 0, //usando o localStorage pego o item salvo internamente como "saldo" e devolvo no refresh
    emprestimo: Number(localStorage.getItem("emprestimo")) || 0,
}

//Crio a funcao reducer que trabalha em cada possibilidade dada para o programa
function reducer(state, action) {
    switch (action.type) {  // O switch deve estar no início
        case "add":
            return {
                ...state, saldo: state.saldo + action.payload,
            };
        case "emprestimo":
            return {
                ...state, emprestimo: state.emprestimo + action.payload,
            };
        case "pagarEmp":
            if (state.saldo >= state.emprestimo) {
                return {
                    ...state,
                    saldo: state.saldo - state.emprestimo,
                    emprestimo: 0,
                };
            } else {
                alert("Saldo insuficiente para pagar o empréstimo.");
                return state;
            }
        case "out":
            return {
                ...state, saldo: state.saldo - action.payload,
            };
        default:
            return state;  // O default sempre deve ser a última linha dentro do switch
    }
}

const AppPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState); //inicializo o useReducer
    const {saldo, emprestimo} = state; // desestruturo
    const navigate = useNavigate(); // inicializo o useNavigate

    useEffect(() => {
        localStorage.setItem("saldo", saldo);
        localStorage.setItem("emprestimo", emprestimo);
    }, [saldo, emprestimo]); //Faço o useEffect atualizar a cada mudanca de um dos valores, e armazenar no local storage

    return (
        <>
            <h1>Bem-vindo à sua conta</h1>

            <p>Saldo: {saldo}</p>
            <p>Empréstimo: {emprestimo}</p>

            <p>
                <button
                    onClick={() => dispatch({type: "add", payload: 300})}>   {/*Passo as informaçoes para o dispatch*/}
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
                {/* Crio um botao que na condicao de quando o if esta true ira navegar para a pagina inicial, usando o useNavigate para deste modo nao dar refresh
            na pagina de atualizar de maneira sutil
            */}
            </p>
        </>
    );
};

export default AppPage;
