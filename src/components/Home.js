import axios from "axios";
import {Link} from "react-router-dom";
import "../css/bootstrap.min.css"
import logo from "../assets/home.jpg"

function Home () {

    const name = localStorage.getItem("name")

    const token = localStorage.getItem("token");
    
    return (
        
        <div className="container users">
        {/* {token && <Navigate to="/listado" />} */}
            <div className="row align-items-center justify-content-evenly">
                
                
                <div className="col-6 users-logo">
                    <Link to="/">
                        <img style={{maxWidth: "35vw"}} src={logo} alt="home logo" />    
                    </Link>
                </div>

                <div className="col-4 users-form">
                    <h2>Home</h2>
                    {token && <h5>Welcome back {name}</h5>}
                    

                        
                </div>
            
            </div>
        </div>

    )
}

export default Home