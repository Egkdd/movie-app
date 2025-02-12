import { useEffect, useState, useCallback } from "react";
import { fetchMovies } from "../utils/fetchMovies.jsx";

export default function useMovies() {
  const [movies, setMovies] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    trending: [],
  });

  const getMovies = useCallback(async () => {
    try {
      const [popular, topRated, upcoming, trending] = await Promise.all([
        fetchMovies("popular"),
        fetchMovies("top_rated"),
        fetchMovies("upcoming"),
        fetchMovies("trending"),
      ]);
      setMovies({ popular, topRated, upcoming, trending });
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return movies;
}
