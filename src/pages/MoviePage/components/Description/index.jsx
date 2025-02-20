import style from "./style.module.scss";

const DescriptionData = ({ type, data }) => (
  <p>
    <strong>{type}:</strong> {data}
  </p>
);

export default function Description({ movie })  {
  const formattedRating = movie.vote_average.toFixed(1) + " ⭐";
  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const productionCountries = movie.production_countries
    .map((country) => country.name)
    .join(", ");

  const descriptionItems = [
    { type: "Genres", data: genres },
    { type: "Release Date", data: movie.release_date },
    { type: "Rating", data: formattedRating },
    { type: "Duration", data: movie.runtime },
    { type: "Language", data: movie.original_language },
    { type: "Production Countries", data: productionCountries },
    { type: "Budget", data: `$${movie.budget.toLocaleString()}` },
    { type: "Revenue", data: `$${movie.revenue.toLocaleString()}` },
    { type: "Description", data: movie.overview },
  ];

  return (
    <div className={style.description}>
      <h2>{movie.title}</h2>
      <div className={style.details}>
        {descriptionItems.map((item, index) => (
          <DescriptionData key={index} type={item.type} data={item.data} />
        ))}
      </div>
    </div>
  );
};
