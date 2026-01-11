import { useLocation, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { useState, useEffect, useContext } from "react";

import { watchlistcontext } from "../components/moviecontext";





export function Detail() {

    const { addtowatchlist } = useContext(watchlistcontext);

    const { id } = useParams();

    const [movies, setMovies] = useState(null);
    const [credits, setCredits] = useState(null);
    const [images, setImages] = useState(null);

    useEffect(() => {

        const API_KEY = '3db7bd73a79fda6cd693c48b3e25eacb'

        const details = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        const credits = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        const images = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
        };


        async function fetchDetails() {

            try {

                const [url1, url2, url3] = await Promise.all([
                    fetch(details),
                    fetch(credits),
                    fetch(images),
                ]);

                const data1 = await url1.json()
                const data2 = await url2.json()
                const data3 = await url3.json()

                console.log(data1);
                setMovies(data1);
                setImages(data3);
                setCredits(data2);

            } catch (error) {
                console.log(error)
            }

            // console.log("Movie Detail:", data);
        }

        fetchDetails();

    }, [id]);



    return (
        <>
            <div className="relative bg-cover bg-center sm:pt-[80px] md:pt-[300px] px-[20px]"
                style={{
                    backgroundImage: images?.backdrops?.[0]
                        ? `url(https://image.tmdb.org/t/p/original${images.backdrops[0].file_path})`
                        : ""
                }}
            >
                {/* {images?.backdrops?.[0] && (
                    <img
                        src={`https://image.tmdb.org/t/p/original${images.backdrops[0].file_path}`}
                        alt="backdrop"
                        className="w-[100vw] object-cover relative z-0"
                    />
                )} */}
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="z-10 relative inset-0">
                    <div className="text-white text-2xl font-bold">
                        {movies?.title && (
                            <h1 className="py-[20px] font-bold text-[#E50914] text-5xl md:text-7xl tracking-tight">{movies.title}</h1>
                        )}
                        {images?.posters?.[0] && (
                            <img
                                className="w-[150px] md:w-[220px] h-[240px] md:h-[300px] mb-[15px] border-2 border-2 border-[#00ffb7a7]"
                                src={`https://image.tmdb.org/t/p/w200/${images.posters[0].file_path}`}
                            />
                        )}

                        <ul className="flex gap-2">
                            {movies?.genres?.map((genre) => (
                                <li key={genre.id} className="text-[14px] md:text-[25px]">{genre.name}</li>
                            ))}
                        </ul>

                        {movies?.runtime && (
                            <p className="pb-[20px] text-[14px] md:text-[25px]">runtime : {movies.runtime} minutes</p>
                        )}
                    </div>
                </div>
                <button onClick={() => { addtowatchlist(movies) }} className="bg-[#00ffb7a7] relative py-[15px] px-[10px] rounded-[10px] mb-[10px]">Add to your watchlist</button>

            </div>


            <div className="py-[20px] px-[20px] bg-black ">
                {movies?.overview && (
                    <p className="text-2xl font-bold text-amber-50">description : {movies.overview}</p>
                )}

                {movies?.tagline && (
                    <p className="py-[10px] text-2xl text-amber-50"> tagline : {movies.tagline}</p>
                )}

                {movies?.release_date && (
                    <p className="text-2xl text-amber-50">relase date : {movies.release_date}</p>
                )}

                <div>
                    <div className="flex flex-wrap gap-[10px]">
                        {movies?.production_companies?.map((prod) => (
                            <ul key={prod.id}>
                                <li>
                                    <p className="text-2xl py-[5px] text-amber-50">{prod.name}</p>
                                    {prod.logo_path ? (
                                        <img
                                            className="h-[80px]"
                                            src={`https://image.tmdb.org/t/p/original${prod.logo_path}`}
                                        />
                                    ) : (
                                        <p className="h-[80px] w-[80px]">no photo</p>
                                    )}
                                </li>
                            </ul>
                        ))}
                    </div>

                </div>
                <h1 className="text-amber-50 text-center text-4xl">cast</h1>
                <div className="flex gap-2 justify-center flex-wrap overflow-scroll py-[10px]">
                    {credits?.cast?.length > 0 ? (
                        credits.cast.map((credit) => (
                            <ul key={credit.id}>
                                <li className="w-[250px]">
                                    {credit.profile_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${credit.profile_path}`}
                                            alt="backdrop"
                                            className="w-[250px] h-[250px] object-cover"
                                        />
                                    ) : (
                                        <p className="w-[250px] h-[250px] text-center content-center">no photo</p>
                                    )}
                                    <p className="text-amber-50">character : {credit.character}</p>
                                    <p className="text-amber-50">original name : {credit.name}</p>
                                </li>
                            </ul>
                        ))
                    ) : (<p>loading...</p>)}
                </div>

            </div>

        </>
    )
}



