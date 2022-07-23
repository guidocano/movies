import { Link, Navigate} from "react-router-dom";
import  { useEffect, useState} from "react";
import axios from "axios";
import swAlert from '@sweetalert/with-react';

function Upcoming (props) {

    let token = localStorage.getItem("token");

    const [moviesList, setMoviesList] = useState([]);

    // useEffect(() => {
    //     token = localStorage.getItem("token")
    //     if(token === null) {
    //         navigate('/');
    //     }
    // }, [navigate]);
    

    useEffect(() => {
        const endPoint = "https://api.themoviedb.org/3/movie/upcoming?api_key=7acbc6a0e91987e8ec8d8e365b57a1c7&language=en-US&page=1";
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results)
                console.log(apiData.results)
            })
            .catch(error => 
                swAlert(<h2>Technical Difficulties. Try again later.</h2>))
    
    }, [setMoviesList]);

    // console.log(moviesList)
    // console.log(props.favorites)


    return (
        <>
        {!token && <Navigate to="/login" />}
        
        <div className="row listado">
        <h2 className="section-title">COMING SOON</h2>
        <br/>
        {
            moviesList.map((oneMovie) => {
                return(
                    <div className="col-3 movie-card" key={oneMovie.id}>
                        <div className="card">
                            <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="movie poster" />
                            <button 
                                onClick={props.addRemoveFavs} 
                                className="favourite-btn"
                                data-movie-id={oneMovie.id}>
                                {
                                    props.favorites.find(element => element.id == oneMovie.id ) ? <>❤️</>  : <>🤍</>
                                }
                            </button>
                            
                            <div className="card-body">
                                <h5 className="card-title movie-title">{oneMovie.title.substring(0, 30)}</h5>
                                <h6>Release Date: {oneMovie.release_date}</h6>
                                <p className="card-text">{oneMovie.overview.substring(0, 100)}...</p>
                                <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">Details</Link>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        

            
            
        </div>
        </>
    )
}

export default Upcoming