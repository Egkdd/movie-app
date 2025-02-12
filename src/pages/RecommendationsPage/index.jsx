import MovieList from "../../components/MovieList/index.jsx";
import useMovies from "../../hooks/useMovies.jsx";
import style from "./style.module.scss";

export default function RecommendationPage() {
  const { trending } = useMovies();

  return (
    <div className={style.recommendationPage}>
      <h1>🎬 Movie Recommendations Just for You 🎬</h1>
      <div className={style.section}>
        <h2>🔥 Trending Movies 🔥</h2>
        {trending && trending.length > 0 ? (
          <MovieList movies={trending} />
        ) : (
          <p>No trending movies available</p>
        )}
      </div>
    </div>
  );
}
