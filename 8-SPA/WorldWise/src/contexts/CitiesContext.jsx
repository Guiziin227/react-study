import {createContext, useContext, useEffect, useState} from "react";

const CitiesContext = createContext()

function CitiesProvider({children}) {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState(
        {}
    );

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

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:8000/cities/${id}`);
            const data = await res.json();
            console.log(data)
            setCurrentCity(data)
        } catch {
            alert("error")
        } finally {
            setIsLoading(false)
            console.log("Carregado da city")
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:8000/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {"Content-Type": "application/json"},
            });
            const data = await res.json();

            setCities(cities => [...cities, data]);
        } catch {
            alert("error")
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`http://localhost:8000/cities/${id}`, {
                method: "DELETE",
            });
            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch {
            alert("error")
        } finally {
            setIsLoading(false)
        }
    }

    return <CitiesContext.Provider value={{
        cities, isLoading, currentCity, getCity, createCity, deleteCity
    }}>{children}</CitiesContext.Provider>;
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContextProvider returns undefined");
    return context
}

export {CitiesProvider, useCities};