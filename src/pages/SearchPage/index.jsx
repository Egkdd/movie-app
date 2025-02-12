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

  const renderResults = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (filteredResults.length > 0) {
      return <MovieList movies={filteredResults} />;
    }

    return <p>No movies found matching your criteria.</p>;
  };

  return (
    <div className={style.search}>
      <h1>🔎 Search Movies 🔍</h1>
      <div className={style.searchBox}>
        <input
          type="text"
          placeholder="Enter the title"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <button onClick={handleSearch} className={style.searchButton}>
          Search
        </button>
        <button onClick={handleClear} className={style.clearButton}>
          Clear
        </button>
      </div>

      {renderResults()}
    </div>
  );
}
