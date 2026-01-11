import { useNavigate } from "react-router-dom";


export function Card({ movie }) {




    const navigate = useNavigate();

    const handledetail = () => {
        navigate(`/detail/${movie.id}`)
    }


    return (
        <>
            <div onClick={handledetail} className="hover:scale-110 transition transform duration-300">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    className="w-[135px] md:w-[200px] rounded-[8px] border-2 border-[#00ffb7a7]"
                />
            </div>
        </>
    )
}