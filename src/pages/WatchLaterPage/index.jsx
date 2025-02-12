import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/index";
import emptyListImg from "../../assets/images/emptyList.svg";
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

  const renderEmptyState = () => (
    <div className={style.emptyState}>
      <p>No movies in your "Watch Later" list yet.</p>
      <img src={emptyListImg} alt="Empty List" />
    </div>
  );

  return (
    <div className={style.watchLaterPage}>
      <h1>🎥 Your Watch Later" List 🎥</h1>
      {watchLaterList.length > 0 ? (
        <MovieList
          movies={watchLaterList}
          onRemove={handleRemoveFromWatchLater}
        />
      ) : (
        renderEmptyState()
      )}
    </div>
  );
}
