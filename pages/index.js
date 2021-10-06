import { useEffect, useState } from "react";
import Head from "next/head";

import styles from "../styles/Home.module.scss";
import Buscador from "../components/Buscador";
import Navbar from "../components/Navbar";
import Pokedex from "../components/Pokedex";
import { getPokemonData, getPokemons, SearchPokemon } from "../api/pokemon";
import { FavoriteProvider } from "../context/favoriteContext";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(12, 12 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 12));
      setNotFound(false);
    } catch (error) {
      console.log(error);
    }
  };

  const localStorageKey = "favorite_pokemon";

  const loadFavoritesPokemon = () => {
    const pokemons = JSON.parse(localStorage.getItem(localStorageKey));
    if (pokemons) {
      setFavorites(pokemons);
    }
  };

  // SW
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  useEffect(() => {
    loadFavoritesPokemon();
  }, []);

  // get All Pokemons
  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const updateFavoritePokemon = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }

    setFavorites(updated);
    localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return await fetchPokemons();
    }

    setLoading(true);
    setNotFound(false);
    setSearching(true);

    const result = await SearchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }

    setLoading(false);
    setSearching(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>PokeApp</title>
        <meta name="description" content="PokeApp - SW" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <FavoriteProvider
          value={{
            favoritesPokemons: favorites,
            updateFavoritePokemon: updateFavoritePokemon,
          }}
        >
          <Navbar />
          <Buscador onSearch={onSearch} />
          {notFound ? (
            <div className={styles.NotFoundText}>
              No se encontro el pokemon que buscabas 😭
            </div>
          ) : (
            <Pokedex
              pokemons={pokemons}
              page={page}
              setPage={setPage}
              total={total}
              loading={loading}
              searching={searching}
            />
          )}
        </FavoriteProvider>
      </main>
    </div>
  );
}
