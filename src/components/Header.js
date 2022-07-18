import {Link, useNavigate} from "react-router-dom";

// components
import Buscador from "./Buscador";
// styles
import "../css/header.css"


function Header (props) {

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const logOut = () => {
        localStorage.removeItem("token");
        navigate(0);
    }



    return (
        <header>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {!token &&
                                    <Link className="nav-link" to="/">Login</Link>
                                }
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/listado">In Theaters</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/favoritos">Favorites</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <span className="text-success ">
                                    { token && <>({props.favorites.length})</> }
                                </span>
                            </li>


                        </ul>
                    </div>
                    { token && <>                            
                        <Link className="nav-link" onClick={logOut} to="/">Log Out</Link> <span>&nbsp; |</span>
                    </> 
                    }
                    <div></div>
                    <Buscador/>
                </div>
            </nav>
        </header>
    )
}

export default Header;