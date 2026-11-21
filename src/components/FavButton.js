function FavButton ({ isFavorite, onClick }) {
    return (
        <button onClick={onClick} className="favourite-btn" aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            {isFavorite ? "❤️" : "🤍"}
        </button>
    );
}

export default FavButton;
