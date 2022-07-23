import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios"
import { useLocation } from 'react-router-dom'

function Detalle (props) {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    let movieID = searchParams.get("movieID")

    
    let token = localStorage.getItem("token")

    // let query = new URLSearchParams(window.location.search);
    // let movieID = query.get("movieID")


    const [movie, setMovie] = useState(null);

    const key = "7acbc6a0e91987e8ec8d8e365b57a1c7"


    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}&language=en-US`;
        axios.get(endPoint)
            .then(response => {
                setMovie(response.data);
                // console.log(movie)
            })
            .catch(error => {
                console.log(error)
            })


    }, [movieID])

    return (
        <>
            {!token && <Navigate to="/login" />}
            {/* {!movie && <p>Loading...</p>} */}
            {movie && 
                <>

                    <div className="row detalle">
                        <h2 className="section-title">MOVIE DETAILS</h2>
                        <br />
                        <div className="col-4">

                            <div className="card">
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster" />
                                <button 
                                        onClick={props.addRemoveFavs} 
                                        className="favourite-btn"
                                        data-movie-id={movie.id}>
                                        {
                                            props.favorites.find(element => element.id == movie.id ) ? <>❤️</>  : <>🤍</>
                                        }
                                </button>
                                <p className="d-none">{movie.overview}</p>
                                <h2 className="movie-title d-none">{movie.title.substring(0, 30)}</h2>
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
                                {movie.genres.map( oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>
        
    )
}

export default Detalle;