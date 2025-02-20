import { useState } from "react";
import MovieList from "../../components/MovieList";
import useMovieSearch from "../../hooks/useMovieSearch";
import genres from "../../utils/consts.js";
import style from "./style.module.scss";

export default function SearchPage() {
  const [movie, setMovie] = useState("");
  const [genre, setGenre] = useState("");

  const { results, isLoading, error, handleSearch, handleClear } =
    useMovieSearch(movie, setMovie, genre, setGenre);

  const filteredResults = results.filter((movie) => {
    if (!movie.poster_path) return false;
    if (!genre) return true;
    return movie.genre_ids && movie.genre_ids.includes(parseInt(genre));
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={style.search}>
      <h1>🔎 SEARCH MOVIES 🔍</h1>
      <div className={style.searchBox}>
        <input
          type="text"
          placeholder="Enter the title"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <div className={style.actions}>
          <button onClick={handleSearch} className={style.searchButton}>
            Search
          </button>
          <button onClick={handleClear} className={style.clearButton}>
            Clear
          </button>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {filteredResults.length > 0 ? (
        <MovieList movies={filteredResults} />
      ) : (
        <p>No movies found matching your criteria.</p>
      )}
    </div>
  );
}
