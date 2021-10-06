import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import styles from "./Pagination.module.scss";

const Pagination = ({ handleClickLeft, handleClickRight, page, total }) => {
  return (
    <div className={styles.Pagination}>
      <button onClick={handleClickLeft}>
        <AiOutlineLeft />
      </button>
      <div>
        {page} de {total}
      </div>
      <button onClick={handleClickRight}>
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default Pagination;
