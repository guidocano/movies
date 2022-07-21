import {useState, useEffect} from "react";

// Libraries
import {Routes, Route} from "react-router-dom";

// Components
import Home from "./components/Home";
import Listado from "./components/Listado"
import Detalle from "./components/Detalle"
import Favoritos from "./components/Favoritos"
import Resultados from "./components/Resultados"
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header"
import Footer from "./components/Footer"

// Styles
import "./css/bootstrap.min.css"
import "./css/app.css"

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect (() => {
      const favsInLocal = localStorage.getItem("favs")

      if(favsInLocal !== null) {
          const favsArray = JSON.parse(favsInLocal)
          setFavorites(favsArray)
      }
  }, [])



  const addRemoveFavs = e => {

    const favMovies = localStorage.getItem("favs")

    let tempMoviesInFavs;
  
    if (favMovies === null) {
      tempMoviesInFavs = []
  
    } else {
        tempMoviesInFavs = JSON.parse(favMovies)
    }

    //grabs pressed Fav info
    const btn = e.currentTarget;
    const parent = e.currentTarget.parentElement;
    const imgUrl = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;

    const movieData = {
      imgUrl, title, overview,
      id: btn.dataset.movieId
    };
    
    //checks if already added
    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id}); //returns first identical id movie

    if (!movieIsInArray){ //if undefined, new movie not there
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
      console.log("Se agregó la película.")

    } else { // if movie already added
        let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
          return oneMovie.id !== movieData.id
        }); //returns array of true values, array without duplicate movie
        localStorage.setItem("favs", JSON.stringify(moviesLeft))
        setFavorites(moviesLeft)
        console.log("Se eliminó la película.")
    }
  }
  
  return (
    <>
      <Header favorites={favorites}/>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/listado" element={<Listado favorites={favorites} addRemoveFavs={addRemoveFavs}/>}/>
          <Route path="/detalle" element={<Detalle favorites={favorites} addRemoveFavs={addRemoveFavs}/>}/>
          <Route path="/resultados" element={<Resultados favorites={favorites} addRemoveFavs={addRemoveFavs}/>}/>
          <Route path="/favoritos" element={<Favoritos favorites={favorites} addRemoveFavs={addRemoveFavs}/>}/>
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
