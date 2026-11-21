import { Link } from "react-router-dom";
import Buscador from "./Buscador";
import logo from "../assets/logo3.jpg";
import logoSmall from "../assets/logo-sm.jpg";
import "../css/header.css";

function Header ({ favoritesCount }) {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <img src={logo} className="logo-header logo-big" alt="home logo" />
                            <img src={logoSmall} className="logo-header-small logo-small" alt="home logo" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/">In Theaters</Link>
                    </li>
                    <li>
                        <Link to="/upcoming">
                            <span className="coming-big">Coming Soon&nbsp;</span>
                            <span className="coming-small">Upcoming&nbsp;</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/favoritos">
                            <span className="favs-big">Favorites&nbsp;</span>
                            <span className="favs-small">Favs&nbsp;</span>
                            <span className="favorites-num">({favoritesCount})</span>
                        </Link>
                    </li>
                    <li className="nav-right buscador">
                        <Buscador />
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
