import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovie, posterUrl } from "../api";
import FavButton from "./FavButton";

function Detalle ({ isFavorite, toggleFavorite }) {
    const [searchParams] = useSearchParams();
    const movieID = searchParams.get("movieID");

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        getMovie(movieID)
            .then(setMovie)
            .catch(error => console.error(error));
    }, [movieID]);

    if (!movie) return null;

    const favData = { id: String(movie.id), title: movie.title, overview: movie.overview, imgUrl: posterUrl(movie.poster_path) };

    return (
        <div className="row detalle">
            <h2 className="section-title">MOVIE DETAILS</h2>

            <div className="col-4">
                <div className="card">
                    <img src={favData.imgUrl} className="img-fluid" alt="movie poster" />
                    <FavButton isFavorite={isFavorite(movie.id)} onClick={() => toggleFavorite(favData)} />
                </div>
            </div>

            <div className="col-8">
                <h2 className="movie-title">{movie.title}</h2>
                <h5>Release Date: {movie.release_date}</h5>
                <h5>Overview: </h5>
                <p>{movie.overview}</p>
                <h5>Rating: {movie.vote_average}</h5>
                <h5>Genres: </h5>
                <ul>
                    {movie.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default Detalle;
