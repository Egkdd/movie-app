import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMovies } from "../../context/MovieContext";
import Description from "./components/Description";
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

  return (
    <div className={style.moviePage}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={style.poster}
      />
      <Description movie={movie} />
    </div>
  );
}
