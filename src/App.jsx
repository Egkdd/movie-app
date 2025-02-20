import "./App.scss";
import {
  Header,
  HomePage,
  SearchPage,
  RecommendationsPage,
  WatchLaterPage,
  MoviePage,
} from "./components";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext.jsx";
import "./App.scss";

function App() {
  return (
    <MovieProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/watch-later" element={<WatchLaterPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;
