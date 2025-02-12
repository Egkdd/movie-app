import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../../../../context/MovieContext";
import useWatchLater from "../../../../hooks/useWatchLater";
import style from "./style.module.scss";

export default function MovieCard({ movie, onRemove }) {
  const { title, poster_path, vote_average, release_date, id } = movie;
  const { movieDetails, fetchMovieDetails } = useMovies();
  const [duration, setDuration] = useState(null);
  const { isInWatchLater, toggleWatchLater } = useWatchLater(movie);

  useEffect(() => {
    if (!movieDetails[id]) {
      fetchMovieDetails(id);
    } else {
      setDuration(movieDetails[id]?.runtime);
    }
  }, [id, fetchMovieDetails, movieDetails]);

  const handleWatchLaterClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWatchLater();

    if (onRemove && isInWatchLater) {
      onRemove(id);
    }
  };

  const formattedDate = new Date(release_date).getFullYear();
  const formattedRating = vote_average ? vote_average.toFixed(1) : "N/A";

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const truncateTitle = (title) =>
    title.length > 15 ? `${title.slice(0, 15)}...` : title;

  return (
    <div className={style.card}>
      <Link to={`/movie/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className={style.poster}
        />
      </Link>
      <button
        className={style.watchLaterButton}
        onClick={handleWatchLaterClick}
      >
        {isInWatchLater ? "❌" : "⏰"}
      </button>
      <div className={style.description}>
        <h3>{truncateTitle(title)}</h3>
        <p>Rating: {formattedRating} ⭐</p>
        <p>Release Year: {formattedDate}</p>
        {duration ? (
          <p>Duration: {formatDuration(duration)}</p>
        ) : (
          <p>Duration: N/A</p>
        )}
      </div>
    </div>
  );
}
