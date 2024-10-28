import Header from "./Header";
import Main from "./Main";
import {useEffect} from "react";

export default function App() {

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:8000/questions");
            const data = await res.json();
            console.log(data);
        }

        fetchData(); // Chama a função renomeada
    }, []);

    return <div className="app">
        <Header/>
        <Main/>
    </div>
}
