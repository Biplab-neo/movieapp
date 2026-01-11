import { useEffect, useState } from "react";

import { useContext } from "react"

import { watchlistcontext } from "../components/moviecontext"

import { Card } from "../components/card";


export function Watchlist() {

    const [status, setStatus] = useState("all")

    // const [genre, setGenre] = useState([])


    const { watchlist, deletefromwatchlist } = useContext(watchlistcontext);

    // console.log(watchlist)

    const allgenres = [];

    watchlist.map((movie)=>{
        movie.genres.map((gen)=>{
            allgenres.push({
                id : gen.id,
                name : gen.name,
            })
        })
    })

    // console.log(allgenres)

    const genrename = allgenres.map(gen => gen.name)

    const uniquegenre = [...new Set(genrename)]

    console.log(uniquegenre);


    const filteredmovies = watchlist.filter(movie => {

        if (status === "all"){

            return watchlist;

        }else{

            return movie.genres.find(g => g.name === status);
        } 

        
    });

    console.log(filteredmovies);





    return (
        <>
            <div className="bg-[black] h-[100vh] py-[20px] px-[15px] overflow-scroll">
                <h1 className="text-[white] py-[30px]">your watchlist</h1>
                <select
                    className="py-[15px] bg-[green] px-[5px]"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >   
                    <option value="all" className="px-[5px]">all</option>
                    {
                        uniquegenre.map((genre) => (
                            <option className="px-[5px]" value={genre} >{genre}</option>
                        ))
                    }
                </select>
                <ul className="flex flex-wrap gap-2 ">
                    {filteredmovies.map((movie) => (
                        <li className="h-[150px] w-[75px] py-[15px] md:h-[370px] md:w-[210px] text-center content-center" key={movie.id}>
                            <Card movie={movie} />
                            <button onClick={() => deletefromwatchlist(movie.id)} className="bg-[red] py-[2px] px-[2px] mt-[5px] rounded-[5px]" > Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}