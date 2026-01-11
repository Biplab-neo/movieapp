
import { createContext, useState, useEffect } from "react";

import toast from "react-hot-toast";

export const watchlistcontext = createContext();

export const Watchlistprovider = ({ children }) => {

    const [watchlist, setWatchlist] = useState(() => {
        return JSON.parse(localStorage.getItem("watchlist")) || [] ;
    })

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }, [watchlist])



    const addtowatchlist = (movie) => {

        const exist = watchlist.find((item) => item.id === movie.id)

        if (exist) {
            toast.error(`${movie.title} is already added to your watchlist`);
            return;
        }

        setWatchlist([...watchlist, movie])
        
        toast.success(`${movie.title} is added to your watchlist`)

    }

    const deletefromwatchlist = (id) => {

        setWatchlist((previous) =>
            
            previous.filter((item) => 
                
                item.id != id
            
        )

           
        )

        toast("removed")

    }


    return (
        <watchlistcontext.Provider value={{ watchlist, addtowatchlist, deletefromwatchlist }}>
            {children}
        </watchlistcontext.Provider>
    )

}