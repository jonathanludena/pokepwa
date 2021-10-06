/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import FavoriteContext from "../../context/favoriteContext";
import styles from "./Pokemon.module.scss";

const Pokemon = ({ pokemon }) => {
  const { favoritesPokemons, updateFavoritePokemon } = useContext(
    FavoriteContext
  );

  const blackheart = "🖤";
  const redheart = "❤️";
  const heart = favoritesPokemons
    ? favoritesPokemons.includes(pokemon.name)
      ? redheart
      : blackheart
    : blackheart;

  const handleClickHeart = (e) => {
    e.preventDefault();
    updateFavoritePokemon(pokemon.name);
  };

  return (
    <div className={styles.PokemonCard}>
      <div className={styles.Img}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className={styles.CardBody}>
        <div className={styles.CardTop}>
          <h3>{pokemon.name}</h3>
          <div className={styles.PokeId}># {pokemon.id}</div>
        </div>
        <div className={styles.CardBottom}>
          <div className={styles.CardPokeTypes}>
            {pokemon.types.map((type, i) => (
              <div key={i} className={styles.PokeType}>
                {type.type.name}
              </div>
            ))}
          </div>
          <div className={styles.CardFavorite}>
            <button onClick={handleClickHeart}>{heart}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
