import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

function Resultados (props) {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const token = localStorage.getItem("token")

    const key = "7acbc6a0e91987e8ec8d8e365b57a1c7"

    // const query = new URLSearchParams(window.location.search);
    const keyword = searchParams.get("keyword")


    const [moviesResults, setMoviesResults] = useState([])

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${keyword}`;
        axios.get(endPoint)
            .then(response => {
                const moviesArray = response.data.results;
                if (moviesArray.length === 0) {
                    Swal.fire({
                        title:'No results.',
                    })
                }
                setMoviesResults(moviesArray);
            })
            .catch(error => {
                console.log(error)
            })
    }, [keyword]);


    return (
        <>

            <div className="row resultados">
                <h2 className="section-title">SEARCH MOVIES: <em>{keyword}</em></h2>
                <br/>
                {moviesResults.length === 0 && <h3>No results found.</h3>}
                {
                    moviesResults.map((oneMovie) => {
                        return(
                            <div className="col-2 movie-card" key={oneMovie.id}>
                                <div className="card">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="movie poster" />
                                    {
                                        token && 
                                        <button 
                                            onClick={props.addRemoveFavs} 
                                            className="favourite-btn"
                                            data-movie-id={oneMovie.id}>
                                            {
                                                props.favorites.find(element => element.id == oneMovie.id ) ? <>❤️</>  : <>🤍</>
                                            }
                                        </button>
                                    }
                                    <div className="card-body">
                                        <h5 className="card-title movie-title">{oneMovie.title.substring(0, 30)}</h5>
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

export default Resultados;



    // function button (e) {
    //     e.preventDefault();
    //     console.log(window.location.search)
    // }
    // const [key, setKey] = useState("")

    // useEffect (() => {
    //     console.log("useEffect updating")
    //     let query = new URLSearchParams(window.location.search)
    //     let keyword = query.get("keyword")
    //     setKey(keyword)
    // })