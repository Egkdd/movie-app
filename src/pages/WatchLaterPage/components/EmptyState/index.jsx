import emptyListImg from "../../../../assets/images/emptyList.svg";
import style from "./style.module.scss";

export default function EmptyState() {
  return (
    <div className={style.emptyState}>
      <p>No movies in your "Watch Later" list yet.</p>
      <img src={emptyListImg} alt="Empty List" />
    </div>
  );
}
