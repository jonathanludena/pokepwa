import { createContext } from "react";

const FavoriteContext = createContext({
  favoritesPokemons: [],
  updateFavoritePokemon: (id) => null,
});

export const FavoriteProvider = FavoriteContext.Provider;

export default FavoriteContext;
