import {useEffect, useState} from "react";

export function useMovies(query, callback) {

    const KEY = "3d251b3";

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        callback?.()

        const controller = new AbortController()

        async function fetchMovies() {
            try {
                setIsLoading(true)
                setError('')
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal})

                if (!res.ok) throw new Error("Vish deu erro na busca")

                const data = await res.json()
                if (data.Response === "False") throw new Error("Filme não encontrado")
                setMovies(data.Search);
                setError("")
                setIsLoading(false)
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err.message)
                    setError(err.message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        if (query.length < 2) {
            setMovies([])
            setError("")
            return
        }

        fetchMovies();
        return function () {
            controller.abort();
        }
    }, [query]);

    return {movies, isLoading, error}
}