import MovieList from "../../components/MovieList/index.jsx";
import useMovies from "../../hooks/useMovies.jsx";
import style from "./style.module.scss";

export default function RecommendationPage() {
  const { trending } = useMovies();

  return (
    <div className={style.recommendationPage}>
      <h1>🎬 MOVIE RECOMMENDATIONS 🎬</h1>
      {trending && trending.length > 0 ? (
        <MovieList movies={trending} />
      ) : (
        <p>No trending movies available</p>
      )}
    </div>
  );
}
