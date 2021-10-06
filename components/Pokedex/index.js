import Loading from "../Loading";
import Pagination from "../Pagination";
import Pokemon from "../Pokemon";

import styles from "./Pokedex.module.scss";

const Pokedex = ({ pokemons, page, setPage, total, loading, searching }) => {
  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  };

  const nextPage = () => {
    if (pokemons.length > 1) {
      const nextPage = Math.min(page + 1, total);
      setPage(nextPage);
    }
  };

  return (
    <div className={styles.Pokedex}>
      <header className={styles.Header}>
        <div>
          <h1>Pokedex</h1>
        </div>
        <Pagination
          page={page + 1}
          total={total}
          handleClickLeft={lastPage}
          handleClickRight={nextPage}
        />
      </header>
      {loading ? (
        <Loading />
      ) : (
        <section className={styles.Content}>
          {pokemons.map((pokemon, i) => (
            <Pokemon key={i} pokemon={pokemon} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Pokedex;
