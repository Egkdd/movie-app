import MovieCard from "./components/MovieCard";
import style from "./style.module.scss";

export default function MovieList({ movies, onRemove }) {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <ul className={style.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={style.movieItem}>
          <MovieCard movie={movie} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  );
}
