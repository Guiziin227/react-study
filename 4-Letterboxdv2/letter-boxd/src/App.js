import {useEffect, useState} from "react";
import "./index.css"

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "3d251b3";

export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [selectedId, setSelectedId] = useState(null)

    function handleSelectedId(id) {
        setSelectedId(selectedId => (selectedId === id ? id : null));
    }

    function handleCloseId() {
        setSelectedId(null)
    }

    useEffect(() => {

        async function fetchMovies() {
            try {
                setIsLoading(true)
                setError('')
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)

                if (!res.ok) throw new Error("Vish deu erro na busca")

                const data = await res.json()
                if (data.Response === "False") throw new Error("Filme não encontrado")
                setMovies(data.Search);
                setIsLoading(false)
            } catch (err) {
                console.error(err.message)
                setError(err.message)
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
    }, [query]);


    return (
        <>
            <Navbar>
                <Search setQuery={setQuery} query={query}/>
                <NumResults movies={movies}/>
            </Navbar>
            <Main>
                <Box>
                    {/*{isLoading ? <Loader/> : <MovieList movies={movies}/>}*/}
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedId}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>

                <Box>
                    {selectedId ? <SelectedMovie selectedId={selectedId} onCloseId={handleCloseId}/> : <>
                        <WatchedSummary watched={watched}/>
                        <WatchedMoviesList watched={watched}/>
                    </>}
                </Box>
            </Main>
        </>
    );
}

function Loader() {
    return <p className="loader">Loading...</p>
}

function ErrorMessage({message}) {
    return <p className="error">
        <span>🤬</span> {message}
    </p>
}

function Main({children}) {
    return <main className="main">
        {children}
    </main>
}

function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);
    return <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
        >
            {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
    </div>
}

function MovieList({movies, onSelectMovie}) {

    return <ul className="list list-movies">
        {movies?.map(movie => <Movies movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>)}
    </ul>
}

function Movies({movie, onSelectMovie}) {
    return <li onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`}/>
        <h3>{movie.Title}</h3>
        <div>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
            </p>
        </div>
    </li>
}

function SelectedMovie({selectedId, onCloseId}) {
    return <div className="details">
        <button className="btn-back" onClick={onCloseId}>X</button>
        {selectedId}</div>
}

function WatchedSummary({watched}) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return <div className="summary">
        <h2>Movies you watched</h2>
        <div>
            <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
            </p>
            <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
            </p>
        </div>
    </div>
}

function WatchedMoviesList({watched}) {
    return <ul className="list">
        {watched.map((movie) => <WatchedMovies movie={movie} key={movie.imdbID}/>)}
    </ul>
}

function WatchedMovies({movie}) {
    return <li>
        <img src={movie.Poster} alt={`${movie.Title} poster`}/>
        <h3>{movie.Title}</h3>
        <div>
            <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
            </p>
        </div>
    </li>
}

function Navbar({children}) {
    return (<nav className="nav-bar">
        <Logotype/>
        {children}
    </nav>)
}

function Logotype() {
    return <div className="logo">
        <span role="img">🍿</span>
        <h1>LetterBoxd</h1>
    </div>
}

function NumResults({movies}) {
    return <p className="num-results">
        Found <strong>{movies.length}</strong> results
    </p>
}

function Search({query, setQuery}) {
    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
    />
}