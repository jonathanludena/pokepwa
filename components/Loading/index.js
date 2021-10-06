/* eslint-disable @next/next/no-img-element */
import "animate.css";
import styles from "./Loading.module.scss";

const Loading = () => (
  <div className={styles.Loading}>
    <div className="animate__animated animate__bounce animate__infinite	infinite animate__slow">
      <img src="/pokeball.png" width="80px" alt="pokeball_image" />
    </div>
  </div>
);

export default Loading;
