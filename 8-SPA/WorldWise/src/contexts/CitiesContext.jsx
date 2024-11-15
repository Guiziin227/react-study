import {createContext, useContext, useEffect, useState} from "react";

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
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContextProvider returns undefined");
    return context
}

export {CitiesProvider, useCities};