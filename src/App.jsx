import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import StartRating from "./StartRating";

const tempWatchedData = [
  {
    imdbID: "tt15398776",
    title: "Oppenheimer",
    year: "2013",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    runtime: 180,
    imdbRating: 8.6,
    userRating: 10,
  },
  {
    imdbID: "tt1517268",
    title: "Barbie",
    year: "2023",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    runtime: 114,
    imdbRating: 7.2,
    userRating: 8,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
  return (
    <div className="logo">
      <span role="img">🎫</span>
      <h1>Movie</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

NumResults.propTypes = {
  movies: PropTypes.array.isRequired,
};

function MovieItem({ movie, onSelectMovieId }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovieId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.array.isRequired,
};

function MovieList({ movie, onSelectMovieId }) {
  return (
    <ul className="list list-movies">
      {movie?.map((movie, index) => (
        <MovieItem
          key={index}
          movie={movie}
          onSelectMovieId={onSelectMovieId}
        />
      ))}
    </ul>
  );
}

MovieList.movie = {
  movie: PropTypes.array.isRequired,
};

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.trunc(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedItem({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating} IMDB</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating} User</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function WatchedList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedItem
          key={index}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
function BoxMovie({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [userRating, setUserRating] = useState(0);
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isWatched = watched.some((movies) => movies.imdbID === selectedId);
  const userRatingWatched = watched.find(
    (movies) => movies.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Released: released,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Plot: plot,
    Genre: genre,
    Actors: actor,
    Director: director,
  } = movies;

  function handleAddWatched() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      //  split bagian koma, hanya mendapatkan angka, bukan min nya, didalam respons console.log ada
      // angka spasi min

      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating),
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovies(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `${title}`;
    return () => {
      document.title = "PopMovie";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &#x2715;
            </button>
            <img src={poster} alt={`${title} Poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                <span>📅</span>
                <span>{released}</span>
              </p>
              <p>
                <span> ⏳</span>
                <span>{runtime}</span>
              </p>
              <p>
                <span>⭐</span>
                <span>{imdbRating}/10 IMDB Rating</span>
              </p>
            </div>
          </header>
          <section>
            <p>
              <h2>Sinopsis</h2>
              <em>{plot}</em>
            </p>
            <br />
            <p>Genre: {genre}</p>
            <p>Actors: {actor}</p>
            <p>Sutradara: {director}</p>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StartRating max={10} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add To Watched
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have watched this movie with a rating of{" "}
                  {userRatingWatched} / 10
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return (
    <div className="loader">
      <div className="loading-bar">
        <div className="bar"></div>
      </div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span>🚫</span> {message}
    </div>
  );
}

const API_KEY = "78c8037b";

export default function App() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectMovieId] = useState(null);

  function handleSelectedMovieId(id) {
    setSelectMovieId((prevSelectedId) => (prevSelectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectMovieId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          ` http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went Wrong");
        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovie();
    return () => {
      controller.abort();
    };
  }, [query]);
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />

        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <BoxMovie>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movie={movies} onSelectMovieId={handleSelectedMovieId} />
          )}
        </BoxMovie>

        <BoxMovie>
          {selectedMovieId ? (
            <MovieDetails
              selectedId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </BoxMovie>
      </Main>
    </>
  );
}
