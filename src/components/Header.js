import {Link, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'

// components
import Buscador from "./Buscador";
import logos from "../assets/logo3.jpg"
import logosm from "../assets/logo-sm.jpg"
// styles
import "../css/header.css"


function Header (props) {

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/")
        Swal.fire({
            position: 'top',
            icon: 'info',
            title: 'Logged out.',
            showConfirmButton: false,
            timer: 1400,
            width: '300px',
            toast: true
          })
        
    }



    return (
        <header>
            <nav>
                <ul>
                     
                    <li>
                        <Link to="/">
                            <img src={logos} className="logo-header logo-big" alt="home logo" />  
                            <img src={logosm} className="logo-header-small logo-small" alt="home logo" />  
                        </Link>
                        
                    </li>
                    <li>
                        {!token &&
                            <Link className="login" to="/login">Login</Link>
                        }
                    </li>
                    <li>
                        <Link to="/listado">In Theaters</Link>
                    </li>
                    <li>
                        <Link to="/upcoming">
                            <span className="coming-big">Coming Soon&nbsp;</span>
                            <span className="coming-small">Upcoming&nbsp;</span>
                        </Link>
                    </li>
                    <li>
                        <Link  to="/favoritos">
                        <span className="favs-big">Favorites&nbsp;</span>
                        <span className="favs-small">Favs&nbsp;</span>
                        <span className="favorites-num">
                            { token && <>({props.favorites.length})</> }
                        </span>
                        </Link>
                        
                    </li>
                    
                    <li className="nav-right buscador">
                        <Buscador/>
                    </li>

                    <li className="nav-right">
                        { token && <>                            
                                <button className="logout nav-right" onClick={logOut}>Log Out</button>
                            </> 
                        }
                    </li>



                </ul>


            </nav>
            
        </header>
    )
}

export default Header;