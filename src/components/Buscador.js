import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Buscador () {
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        const input = e.currentTarget.keyword;
        const keyword = input.value.trim();

        if (!keyword) {
            Swal.fire({ title: "Write something", confirmButtonColor: "#3085d6" });
            return;
        }

        input.value = "";
        navigate(`/resultados?keyword=${encodeURIComponent(keyword)}`, { replace: true });
    };

    return (
        <form className="d-flex align-items-center" onSubmit={submitHandler}>
            <label className="form-label mb-0 mx-2">
                <input className="form-control" type="text" name="keyword" placeholder="Movie Title..." />
            </label>
            <button className="btn btn-outline-light btn-search" type="submit">Search</button>
        </form>
    );
}

export default Buscador;
