import { useState } from "react";

import styles from "./styles/Buscador.module.scss";

const Buscador = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    if (value.length === 0) {
      onSearch(null);
    }

    setSearch(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSearch(search);
  };

  return (
    <div className={styles.Buscador}>
      <form className={styles.FormBuscador} onSubmit={handleSubmit}>
        <input
          className={styles.inputSearch}
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="Buscar pokemon..."
        />
        <button type="submit" className={styles.BtnSearchBtn}>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Buscador;
