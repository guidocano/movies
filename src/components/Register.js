import axios from "axios";
import swAlert from '@sweetalert/with-react';
import {useNavigate, Navigate, Link} from "react-router-dom";
import "../css/bootstrap.min.css"
import logo from "../assets/home.jpg"

function Register () {

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(email === "" || password === "") {
            swAlert(
                <div>
                    <h5>Fields cannot be empty.</h5>
                </div>                
            )
            return;
        }

        if(email !== "" && !regexEmail.test(email)) {
            swAlert(
                <div>
                    <h5>Please write a valid email adress.</h5>
                </div>                
            )
            return;
        }

        axios
            .post("https://awaitedsong.backendless.app/api/users/register", {
                email ,
                password,
            })
            .then(res => {
                console.log(res)
                swAlert(<div><h3>Registration succesfull!</h3><h5>Please log in.</h5></div>)
                // // console.log(res.data);
                // const tokenRecibido = res.data.token;
                // localStorage.setItem("token", tokenRecibido)
                navigate("/");

            })
            // .catch(swAlert(<div><h3>En error ocurred. Please try again.</h3></div>))

            
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
                    <h2>Register</h2>
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
                    <span>
                        Already have an user? Log in&nbsp;<Link className="text-danger" to="/">here.</Link>
                    </span>
                    <br/><br/>
                </div>
            </div>
        </div>

    )
}

export default Register