import { Link } from "react-router-dom";
import logo from "../../assets/images/movieWhite.svg";
import style from "./style.module.scss";

const ListLink = ({ text, url }) => (
  <li>
    <Link to={url}>{text}</Link>
  </li>
);

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
        <ListLink text="Search" url="/search" />
        <ListLink text="Recommendations" url="/recommendations" />
        <ListLink text="Watch Later" url="/watch-later" />
      </ul>
    </div>
  );
}
