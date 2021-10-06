/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import FavoriteContext from "../../context/favoriteContext";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { favoritesPokemons } = useContext(FavoriteContext);

  const logo_img =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  const redheart = "❤️";

  return (
    <nav className={styles.Navbar}>
      <div className={styles.LogoPokeApp}>
        <img className={styles.Img} src={logo_img} alt="logo_img" />
      </div>
      <div className={styles.PokeNumFavorites}>
        {redheart} {favoritesPokemons ? favoritesPokemons.length : 0}
      </div>
    </nav>
  );
};

export default Navbar;
