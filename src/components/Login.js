import axios from "axios";
import Swal from 'sweetalert2'
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
            Swal.fire({
                title:'Fields cannot be empty',
                confirmButtonColor: '#3085d6',
            })
            return;
        }

        if(login !== "" && !regexEmail.test(login)) {
            Swal.fire({
                title:'Please write a valid email adress.',
                confirmButtonColor: '#3085d6',
            })
            return;
        }


        axios
            .post("https://awaitedsong.backendless.app/api/users/login",  {
                login ,
                password,
            })
            .then(res => {
                const tokenRecibido = res.data["user-token"]
                const nameRecibido = res.data.name
                localStorage.setItem("token", tokenRecibido)
                localStorage.setItem("name", nameRecibido)
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Welcome back.',
                    showConfirmButton: false,
                    timer: 1400,
                    width: '300px',
                    toast: true
                  })
                navigate("/listado");
                
            })
            // .catch(swAlert(<div><h3>En error ocurred. Please try again.</h3></div>))

            
    }

    let token = localStorage.getItem("token");
    
    return (
        
        <div className="container users">
        {token && <Navigate to="/listado" />}
            <div className="row align-items-center justify-content-evenly">
                
                
                <div className="col-6 users-logo">
                    <Link to="/">
                        <img style={{maxWidth: "35vw"}} src={logo} alt="home logo" />    
                    </Link>
                </div>

                <div className="col-4 users-form">
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
                        <span>user: guest@movies.com</span><br/>
                        <span>pass: guest</span>
                        </div>
            
            </div>
        </div>

    )
}

export default Login