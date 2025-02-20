import { useState, useEffect } from "react";
import useMovies from "../../hooks/useMovies.jsx";
import RenderSection from "./components/RenderSection";
import style from "./style.module.scss";

export default function Home() {
  const movies = useMovies();
  const [currentPage, setCurrentPage] = useState({
    popular: 1,
    topRated: 1,
    upcoming: 1,
  });

  const getItemsPerPage = () => {
    if (window.innerWidth <= 768) {
      return 2;
    } else if (window.innerWidth <= 1100) {
      return 4;
    } else if (window.innerWidth <= 1440) {
      return 5;
    } else {
      return 6;
    }
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const sections = [
    {
      title: "🍿 POPULAR MOVIES 🍿",
      section: "popular",
      movieList: movies.popular,
    },
    {
      title: "✨ TOP RATED MOVIES ✨",
      section: "topRated",
      movieList: movies.topRated,
    },
    {
      title: "👀 UPCOMING 👀",
      section: "upcoming",
      movieList: movies.upcoming,
    },
  ];

  return (
    <div className={style.home}>
      {sections.map(({ title, section, movieList }) => (
        <RenderSection
          key={section}
          title={title}
          movieList={movieList}
          section={section}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
        />
      ))}
    </div>
  );
}
