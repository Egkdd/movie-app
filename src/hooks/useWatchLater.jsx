import { useState, useEffect } from "react";

export default function useWatchLater(movie) {
  const { id } = movie;
  const [isInWatchLater, setIsInWatchLater] = useState(false);

  useEffect(() => {
    const savedWatchLater =
      JSON.parse(localStorage.getItem("watchLater")) || [];
    setIsInWatchLater(savedWatchLater.some((m) => m.id === id));
  }, [id]);

  const toggleWatchLater = () => {
    const savedWatchLater =
      JSON.parse(localStorage.getItem("watchLater")) || [];
    const isInList = savedWatchLater.some((m) => m.id === id);

    const updatedList = isInList
      ? savedWatchLater.filter((m) => m.id !== id)
      : [...savedWatchLater, movie];

    localStorage.setItem("watchLater", JSON.stringify(updatedList));
    setIsInWatchLater(!isInList);
  };

  return { isInWatchLater, toggleWatchLater };
}
