import {Link} from "react-router-dom";
import "../css/bootstrap.min.css"
import logo from "../assets/logo-t.png"

function Home () {
    
    return (
                <div className="row align-items-center justify-content-evenly home users">
                                       
                    <div className="users-logo2div">
                        <Link to="/listado">
                            <img className="users-logo2" src={logo} alt="home logo" />    
                        </Link>                  
                 
                    </div>
                </div>
    )
}

export default Home