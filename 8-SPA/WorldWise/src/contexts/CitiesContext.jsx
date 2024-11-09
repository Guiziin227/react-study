import {createContext, useEffect, useState} from "react";

const CitiesContext = createContext()

function CitiesProvider({children}) {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
            async function fecthCities() {
                try {
                    setIsLoading(true);
                    const res = await fetch("http://localhost:8000/cities");
                    const data = await res.json();
                    console.log(data)
                    setCities(data)
                } catch {
                    alert("error")
                } finally {
                    setIsLoading(false)
                    console.log("Carregado")
                }
            }

            fecthCities()
        }
        , []);

    return <CitiesContext.Provider value={{
        cities, isLoading,
    }}>{children}</CitiesContext.Provider>;
}

function useCities() {

}

export {CitiesProvider};