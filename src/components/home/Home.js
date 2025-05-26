import React from "react";
import Hero from "../hero/Hero";
import { useState } from "react";

const Home = ({ movies }) => {
  const [search, setSearch] = useState("");

  // Filtra las películas según el texto de búsqueda
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar película..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "20px auto",
          display: "block",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <Hero movies={filteredMovies} />
    </div>
  );
};

export default Home;