import MovieList from "../../../../components/MovieList";
import style from "./style.module.scss";

export default function RenderSection({
  title,
  movieList,
  section,
  currentPage,
  handlePageChange,
  itemsPerPage,
}) {
  if (!movieList || movieList.length === 0) return null;

  const totalPages = Math.ceil(movieList.length / itemsPerPage);

  const paginateMovies = (movieList, section) => {
    const startIndex = (currentPage[section] - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return movieList.slice(startIndex, endIndex);
  };

  const paginatedMovies = paginateMovies(movieList, section);

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
}
