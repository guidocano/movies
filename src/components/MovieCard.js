import { Link } from "react-router-dom";
import FavButton from "./FavButton";

function MovieCard ({ movie, isFavorite, onToggleFavorite, className = "col-3 movie-card", children }) {
    return (
        <div className={className}>
            <div className="card h-100">
                <img src={movie.imgUrl} className="card-img-top" alt="movie poster" />
                <FavButton isFavorite={isFavorite} onClick={() => onToggleFavorite(movie)} />

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title movie-title">{movie.title.substring(0, 30)}</h5>
                    {children}
                    <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                    <Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary mt-auto align-self-start">Details</Link>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
