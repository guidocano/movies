// styles
import "../css/header.css"

function Footer () {
    return (
        <footer  className="fixed-bottom">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/* <a href="http://instagram.com" rel="noopener noreferrer">IG</a> */}
                            </li>
                        </ul>
                    </div>
                    <p className="nav-link">Movie Ticket</p>
                </div>

            </nav>

        </footer>
    )
}

export default Footer