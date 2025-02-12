const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie/";

const fetchMovies = async (category) => {
  let url = "";

  if (category === "trending") {
    url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
  } else {
    url = `${BASE_URL}${category}?api_key=${API_KEY}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} movies`);
  }

  const data = await response.json();
  return data.results;
};

const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}${id}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  const data = await response.json();
  return data;
};

export { fetchMovies, fetchMovieDetails };
