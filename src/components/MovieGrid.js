import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { posterUrl } from "../api";
import MovieCard from "./MovieCard";

// Shared page for "In Theaters" and "Coming Soon"
function MovieGrid ({ title, fetchMovies, showReleaseDate, isFavorite, toggleFavorite }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies()
            .then(setMovies)
            .catch(() => Swal.fire({ title: "Technical difficulties. Try again later." }));
    }, [fetchMovies]);

    return (
        <div className="row listado">
            <h2 className="section-title">{title}</h2>
            {movies.map(m => {
                const movie = { id: String(m.id), title: m.title, overview: m.overview, imgUrl: posterUrl(m.poster_path) };
                return (
                    <MovieCard key={movie.id} movie={movie} isFavorite={isFavorite(movie.id)} onToggleFavorite={toggleFavorite}>
                        {showReleaseDate && <h6>Release Date: {m.release_date}</h6>}
                    </MovieCard>
                );
            })}
        </div>
    );
}

export default MovieGrid;
