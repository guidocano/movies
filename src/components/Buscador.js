import Swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
// styles
import "../css/header.css"

function Buscador () {
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault()
        const keyword = e.currentTarget.keyword.value.trim();
        // console.log(keyword)

        if(keyword.length === 0) {
            Swal.fire({
                title:'Write Something',
                confirmButtonColor: '#3085d6',
            })

        } else {
            e.currentTarget.keyword.value = "";
            navigate(`/resultados?keyword=${keyword}`, {replace: true});
            // navigate(0);
        }
    }

    return (
        <form className="d-flex align-items-center" onSubmit={submitHandler}>
            <label className="form-label mb-0 mx-2">
                <input className="form-control" type="text" name="keyword" placeholder="Movie Title..."/>    
            </label>

            <button className="btn btn-outline-light btn-search" type="submit">Search</button>
        </form>
    )
}

export default Buscador