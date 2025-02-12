import { Link } from "react-router-dom";
import logo from "../../assets/images/movieWhite.svg";
import style from "./style.module.scss";

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <Link to="/">
          <img src={logo} alt="logo image" />
          <h1>Movie App</h1>
        </Link>
      </div>
      <ul className={style.navigation}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/recommendations">Recommendations</Link>
        </li>
        <li>
          <Link to="/watch-later">Watch Later</Link>
        </li>
      </ul>
    </div>
  );
}
