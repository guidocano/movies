import axios from "axios";
import Swal from 'sweetalert2'
import {useNavigate, Navigate, Link} from "react-router-dom";
import "../css/bootstrap.min.css"
import logo from "../assets/home.jpg"


function Register () {

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(email === "" || password === "") {
            Swal.fire({
                title:'Fields cannot be empty',
                confirmButtonColor: '#3085d6',
            })
            return;
        }

        if(email !== "" && !regexEmail.test(email)) {
            Swal.fire({
                title:'Please write a valid email adress.',
                confirmButtonColor: '#3085d6',
            })
            return;
        }

        axios
            .post("https://awaitedsong.backendless.app/api/users/register", {
                name,
                email ,
                password,
            })
            .then(() => {
                console.log("Registration succesfull.")
                Swal.fire({
                    title:'Registration succesfull!',
                    text: 'Please log in.',
                    confirmButtonColor: '#3085d6',
                })
                // // console.log(res.data);
                // const tokenRecibido = res.data.token;
                // localStorage.setItem("token", tokenRecibido)
                navigate("/login");

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
                    <h2>Register</h2>
                    <form onSubmit={submitHandler}>

                        <label>
                            <span>Name:</span><br/>
                            <input type="text" name="name" />    
                        </label>
                        <br/>
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
                    <span>
                        Already have an user? Log in&nbsp;<Link className="text-danger" to="/login">here.</Link>
                    </span>
                    <br/><br/>
                </div>
            </div>
        </div>

    )
}

export default Register