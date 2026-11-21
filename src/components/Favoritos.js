import MovieCard from "./MovieCard";

function Favoritos ({ favorites, toggleFavorite }) {
    return (
        <div className="row favorites">
            <h2 className="section-title">FAVORITES</h2>
            {!favorites.length && <div className="col-12">Here you can add your favorite movies.</div>}
            {favorites.map(movie => (
                <MovieCard
                    key={movie.id}
                    className="col-3 favs-card"
                    movie={movie}
                    isFavorite
                    onToggleFavorite={toggleFavorite}
                />
            ))}
        </div>
    );
}

export default Favoritos;
