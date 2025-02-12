import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMovies } from "../../context/MovieContext";
import style from "./style.module.scss";

export default function MoviePage() {
  const { id } = useParams();
  const { movieDetails, fetchMovieDetails, loadingDetails, error } =
    useMovies();

  useEffect(() => {
    if (!movieDetails[id]) {
      fetchMovieDetails(id);
    }
  }, [id, fetchMovieDetails, movieDetails]);

  if (loadingDetails) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movie details: {error}</div>;
  }

  const movie = movieDetails[id];

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const formattedRating = movie.vote_average.toFixed(1);
  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const productionCountries = movie.production_countries
    .map((country) => country.name)
    .join(", ");

  return (
    <div className={style.moviePage}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={style.poster}
      />
      <div className={style.description}>
        <h2>{movie.title}</h2>
        <div>
          <p>
            <strong>Genres:</strong> {genres}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {formattedRating} ⭐
          </p>
          <p>
            <strong>Duration:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>Language:</strong> {movie.original_language}
          </p>
          <p>
            <strong>Production Countries:</strong> {productionCountries}
          </p>
          <p>
            <strong>Budget:</strong> ${movie.budget.toLocaleString()}
          </p>
          <p>
            <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
