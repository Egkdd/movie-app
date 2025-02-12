import { useState, useEffect } from "react";

export default function useMovieSearch(movie, setMovie, genre, setGenre) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedMovie = localStorage.getItem("movie");
    const savedGenre = localStorage.getItem("genre");
    const savedResults = localStorage.getItem("results");

    if (savedMovie) setMovie(savedMovie);
    if (savedGenre) setGenre(savedGenre);
    if (savedResults) setResults(JSON.parse(savedResults));
  }, [setMovie, setGenre]);

  useEffect(() => {
    localStorage.setItem("movie", movie);
    localStorage.setItem("genre", genre);
    localStorage.setItem("results", JSON.stringify(results));
  }, [movie, genre, results]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    const movieQuery = movie.trim();
    const genreQuery = genre;

    if (!movieQuery && !genreQuery) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const API_KEY = import.meta.env.VITE_API_KEY;
    let searchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

    if (genreQuery) {
      searchUrl += `&with_genres=${genreQuery}`;
    }

    if (movieQuery) {
      searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        movieQuery
      )}`;
    }

    try {
      const response = await fetch(searchUrl);
      if (!response.ok) {
        const errorData = await response.json();
        setError(
          `Search error: ${response.status} - ${
            errorData.status_message || response.statusText
          }`
        );
        return;
      }

      const data = await response.json();

      if (data && data.results) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      setError("Error during request execution.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMovie("");
    setGenre("");
    setResults([]);
    localStorage.removeItem("movie");
    localStorage.removeItem("genre");
    localStorage.removeItem("results");
  };

  return {
    results,
    isLoading,
    error,
    handleSearch,
    handleClear,
  };
}
