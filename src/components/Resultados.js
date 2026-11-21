import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { posterUrl, searchMovies } from "../api";
import MovieCard from "./MovieCard";

function Resultados ({ isFavorite, toggleFavorite }) {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [results, setResults] = useState([]);

    useEffect(() => {
        searchMovies(keyword)
            .then(movies => {
                if (movies.length === 0) Swal.fire({ title: "No results." });
                setResults(movies);
            })
            .catch(error => console.error(error));
    }, [keyword]);

    return (
        <div className="row resultados">
            <h2 className="section-title">SEARCH MOVIES: <em>{keyword}</em></h2>
            {results.length === 0 && <h3>No results found.</h3>}
            {results.map(m => {
                const movie = { id: String(m.id), title: m.title, overview: m.overview, imgUrl: posterUrl(m.poster_path) };
                return (
                    <MovieCard
                        key={movie.id}
                        className="col-2 movie-card"
                        movie={movie}
                        isFavorite={isFavorite(movie.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                );
            })}
        </div>
    );
}

export default Resultados;
