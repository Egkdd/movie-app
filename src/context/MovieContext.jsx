import { createContext, useContext, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie/";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState({});
  const [movieDetails, setMovieDetails] = useState({});
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (category) => {
    if (movies[category]) return;

    let url = "";
    if (category === "trending") {
      url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
    } else {
      url = `${BASE_URL}${category}?api_key=${API_KEY}`;
    }

    try {
      setLoadingMovies(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} movies`);
      }

      const data = await response.json();
      setMovies((prevMovies) => ({ ...prevMovies, [category]: data.results }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMovies(false);
    }
  };

  const fetchMovieDetails = async (id) => {
    if (movieDetails[id]) return;

    try {
      setLoadingDetails(true);
      setError(null);

      const response = await fetch(`${BASE_URL}${id}?api_key=${API_KEY}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      setMovieDetails((prevDetails) => ({ ...prevDetails, [id]: data }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        movieDetails,
        fetchMovies,
        fetchMovieDetails,
        loadingMovies,
        loadingDetails,
        error,
        clearError,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
