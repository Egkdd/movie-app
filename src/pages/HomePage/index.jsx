import { useState } from "react";
import MovieList from "../../components/MovieList";
import useMovies from "../../hooks/useMovies.jsx";
import style from "./style.module.scss";

export default function Home() {
  const movies = useMovies();
  const [currentPage, setCurrentPage] = useState({
    popular: 1,
    topRated: 1,
    upcoming: 1,
  });
  const itemsPerPage = 6;

  const paginateMovies = (movieList, section) => {
    const startIndex = (currentPage[section] - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return movieList.slice(startIndex, endIndex);
  };

  const handlePageChange = (section, direction) => {
    setCurrentPage((prev) => {
      const newPage = prev[section] + direction;
      const totalPages = Math.ceil(movies[section]?.length / itemsPerPage);
      if (newPage > 0 && newPage <= totalPages) {
        return {
          ...prev,
          [section]: newPage,
        };
      }
      return prev;
    });
  };

  const renderSection = (title, movieList, section) => {
    if (!movieList || movieList.length === 0) return null;

    const paginatedMovies = paginateMovies(movieList, section);
    const totalPages = Math.ceil(movieList.length / itemsPerPage);

    return (
      <div className={style.section} key={section}>
        <h1>{title}</h1>
        <div className={style.pagination}>
          <button
            className={style.arrowButton}
            onClick={() => handlePageChange(section, -1)}
            disabled={currentPage[section] === 1}
          >
            ←
          </button>
          <MovieList movies={paginatedMovies} />
          <button
            className={style.arrowButton}
            onClick={() => handlePageChange(section, 1)}
            disabled={currentPage[section] === totalPages}
          >
            →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={style.home}>
      {renderSection("🍿 POPULAR MOVIES 🍿", movies.popular, "popular")}
      {renderSection("✨ TOP RATED MOVIES ✨", movies.topRated, "topRated")}
      {renderSection("👀 UPCOMING 👀", movies.upcoming, "upcoming")}
    </div>
  );
}
