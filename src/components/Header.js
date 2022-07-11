import {Link} from "react-router-dom";

// components
import Buscador from "./Buscador";

function Header (props) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/listado">Listado</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/favoritos">Favoritos</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <span className="text-success ">
                                    {
                                        props.favorites.length > 0 && <>Pelis en favoritos: {props.favorites.length}</>
                                    }
                                    
                                </span>
                            </li>
                        </ul>
                    </div>
                    <Buscador/>
                </div>
            </nav>
        </header>
    )
}

export default Header;