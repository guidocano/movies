import axios from "axios";
import swAlert from '@sweetalert/with-react';
import {useNavigate, Navigate, Link} from "react-router-dom";
import "../css/bootstrap.min.css"
import logo from "../assets/home.jpg"

function Login () {

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        const login = e.target.email.value;
        const password = e.target.password.value;

        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(login === "" || password === "") {
            swAlert(
                <div>
                    <h2>Los campos no pueden estar vacíos.</h2>
                    <p>Texto texto texto texto 123</p>
                </div>                
            )
            return;
        }

        if(login !== "" && !regexEmail.test(login)) {
            swAlert(
                <div>
                    <h2>Debes escribir una dirección de correo válida.</h2>
                </div>                
            )
            return;
        }


        axios
            .post("https://awaitedsong.backendless.app/api/users/login",  {
                login ,
                password,
            })
            .then(res => {
                const tokenRecibido = res.data["user-token"]
                localStorage.setItem("token", tokenRecibido)
                console.log(localStorage)
                navigate("/listado");

            })

            
    }

    let token = localStorage.getItem("token");
    
    return (
        
        <div className="container">
        {token && <Navigate to="/listado" />}
            <div className="row align-items-center justify-content-evenly">
                
                
                <div className="col-6">
                    <Link to="/">
                        <img style={{maxWidth: "35vw"}} src={logo} alt="home logo" />    
                    </Link>
                </div>

                <div className="col-4">
                    <h2>Login</h2>

                        <form onSubmit={submitHandler}>
                            <label>
                                <span>Email:</span><br/>
                                <input type="text" name="email" />    
                            </label>
                            
                            <br/>
                            <label>
                                <span>Password:</span><br/>
                                <input type="password" name="password" />
                            </label>
                            
                            <br/>
                            <button className="btn btn-success mt-2" type="submit">Enter</button>
                        </form>
                        <br/>
                        <span>You can register&nbsp;
                            <Link className="text-danger" to="/register">here.</Link>
                        </span> <br/>
                        <span>Or log in as a guest: </span><br/>
                        <span>user: guest@cinema.com</span><br/>
                        <span>pass: guest</span>
                        </div>
            
            </div>
        </div>

    )
}

export default Login