import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// API
import { getNowPlaying, getUpcoming } from "./api";

// Components
import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";
import Detalle from "./components/Detalle";
import Favoritos from "./components/Favoritos";
import Resultados from "./components/Resultados";

// Styles
import "./css/bootstrap.min.css";
import "./css/app.css";

const loadFavorites = () => {
    try {
        const stored = JSON.parse(localStorage.getItem("favs")) || [];
        return stored.map(movie => ({ ...movie, id: String(movie.id) }));
    } catch {
        return [];
    }
};

function App () {
    const [favorites, setFavorites] = useState(loadFavorites);

    const isFavorite = id => favorites.some(movie => movie.id === String(id));

    // movie: { id, title, overview, imgUrl }
    const toggleFavorite = movie => {
        const updated = isFavorite(movie.id)
            ? favorites.filter(fav => fav.id !== movie.id)
            : [...favorites, movie];

        localStorage.setItem("favs", JSON.stringify(updated));
        setFavorites(updated);
    };

    const favProps = { isFavorite, toggleFavorite };

    return (
        <>
            <Header favoritesCount={favorites.length} />

            <Routes>
                <Route path="/" element={<MovieGrid title="NOW IN THEATERS" fetchMovies={getNowPlaying} {...favProps} />} />
                <Route path="/listado" element={<Navigate to="/" replace />} />
                <Route path="/upcoming" element={<MovieGrid title="COMING SOON" fetchMovies={getUpcoming} showReleaseDate {...favProps} />} />
                <Route path="/detalle" element={<Detalle {...favProps} />} />
                <Route path="/resultados" element={<Resultados {...favProps} />} />
                <Route path="/favoritos" element={<Favoritos favorites={favorites} {...favProps} />} />
            </Routes>
        </>
    );
}

export default App;
