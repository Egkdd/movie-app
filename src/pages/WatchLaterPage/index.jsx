import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/index";
import EmptyState from "./components/EmptyState";
import style from "./style.module.scss";

export default function WatchLaterPage() {
  const [watchLaterList, setWatchLaterList] = useState([]);

  useEffect(() => {
    const savedWatchLater =
      JSON.parse(localStorage.getItem("watchLater")) || [];
    setWatchLaterList(savedWatchLater);
  }, []);

  const handleRemoveFromWatchLater = (movieId) => {
    const updatedList = watchLaterList.filter((movie) => movie.id !== movieId);
    setWatchLaterList(updatedList);
    localStorage.setItem("watchLater", JSON.stringify(updatedList));
  };

  return (
    <div className={style.watchLaterPage}>
      <h1>🎥 "WATCH LATER" LIST 🎥</h1>
      {watchLaterList.length > 0 ? (
        <MovieList
          movies={watchLaterList}
          onRemove={handleRemoveFromWatchLater}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
