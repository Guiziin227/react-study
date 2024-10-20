import {useEffect, useRef, useState} from "react";
import "../index.css"
import StarRating from "../StarRating";


const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "3d251b3";

export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    //    const [watched, setWatched] = useState([]);
    const [watched, setWatched] = useState(function () {
        const storedValue = localStorage.getItem("watched");
        return JSON.parse(storedValue);
    });

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [selectedId, setSelectedId] = useState(null)

    function handleSelectedId(id) {
        setSelectedId(id);
    }

    function handleCloseId() {
        setSelectedId(null)
    }

    function handleAddWatched(movie) {
        setWatched(watched => [...watched, movie])
        // localStorage.setItem("watched", JSON.stringify([...watched, movie]))
    }

    function handleDeleteWatched(id) {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id))
    }

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched))
    }, [watched])


    useEffect(() => {
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
        handleCloseId()
        fetchMovies();
        return function () {
            controller.abort();
        }
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
                    {selectedId ? <SelectedMovie selectedId={selectedId} onCloseId={handleCloseId}
                                                 watched={watched} onAddWatched={handleAddWatched}/> : <>
                        <WatchedSummary watched={watched}/>
                        <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}/>
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

function SelectedMovie({selectedId, onCloseId, onAddWatched, watched}) {

    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false)
    const [userRating, setUserRating] = useState('')

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)

    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie


    function handleAdd() {

        const newMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
        }
        onAddWatched(newMovie);

        onCloseId()
    }

    useEffect(function () {
        function callback(e) {
            if (e.code === 'Escape') {
                onCloseId()
            }
        }

        document.addEventListener('keydown', callback)

        return () => {
            document.removeEventListener('keydown', callback)
        }
    }, [onCloseId])


    useEffect(() => {
        setLoading(true)

        async function getDetailsMovie() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
            const data = await res.json()
            setMovie(data)
            setLoading(false)
        }

        getDetailsMovie()


    }, [selectedId])

    //Criando um useEffect para mudar o title da pag, de acordo com o filme selecionado, por ser um evento externo, usar useEffect
    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`

        return () => {
            //Cleanup function, serve para que quando o useEffect nao esteja sendo utilizado volte ao padrao
            document.title = `GuiMovies`
        }
    }, [title])

    return <div className="details">
        {loading ? <Loader/> : <>
            <header>
                <button className="btn-back" onClick={onCloseId}>X</button>
                <img src={poster} alt={title}/>
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>{released} &bull; {runtime}</p>
                    <p>{genre}</p>
                    <p><span>✨</span>{imdbRating} IMDb rating</p>
                </div>
            </header>

            <section>
                <div className="rating">
                    {!isWatched ?
                        (<>
                            <StarRating maxStars={10} size={26} onSetRating={setUserRating}/>
                            {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}

                        </>) : (<p>Ja foi add a lista {watchedUserRating}</p>)}
                </div>
                <p><em>{plot}</em></p>
                <p>Atores: {actors}</p>
                <p>Diretor: {director}</p>
            </section>
        </>
        }</div>
}

function WatchedSummary({
                            watched
                        }) {
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
                <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{avgRuntime.toFixed(0)} m</span>
            </p>
        </div>
    </div>
}

function WatchedMoviesList({watched, onDeleteWatched}) {
    return <ul className="list">
        {watched.map((movie) => <WatchedMovies movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>)}
    </ul>
}

function WatchedMovies({movie, onDeleteWatched}) {
    return <li>
        <img src={movie.poster} alt={`${movie.title} poster`}/>
        <h3>{movie.title}</h3>
        <div>
            <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{movie.userRating.toFixed(2)}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
            </p>

            <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
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
    const inputEl = useRef(null);

    useEffect(() => {

        function callback(e) {
            if (document.activeElement === inputEl.current) return

            if (e.code === "Enter") {
                inputEl.current.focus();
                setQuery("");
            }
        }

        document.addEventListener("keydown", callback);

        return () => {
            document.removeEventListener("keydown", callback);
        }

    }, [setQuery])

    // useEffect(() => {
    //     const el = document.querySelector('.search');
    //     console.log(el)
    //     el.focus()
    // }, []);

    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
    />
}