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
                                    <Link className="nav-link login" to="/">Login</Link>
                                }
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/listado">In Theaters</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/favoritos">Favorites&nbsp;
                                <span className="favorites">
                                    { token && <>({props.favorites.length})</> }
                                </span>
                                </Link>
                                
                            </li>
                            <li className="nav-item d-flex align-items-center">

                            </li>


                        </ul>
                    </div>
                    { token && <>                            
                        <button className="nav-link logout" onClick={logOut}>Log Out</button> <span className="nav-link">&nbsp; |</span>
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