


import { useEffect, useState } from "react";
import { useDebounce } from "../components/debounce";
import { Card } from "../components/card";

import { useContext } from "react";

import { watchlistcontext } from "../components/moviecontext";

const API_KEY = "3db7bd73a79fda6cd693c48b3e25eacb";

export function Search() {

  const { addtowatchlist } = useContext(watchlistcontext);


  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [finalmovies, setFinalmovies] = useState([])
  const [moviegenre, setmovieGenre] = useState([]);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {

    async function fetchgenres() {

      const API_KEY = '3db7bd73a79fda6cd693c48b3e25eacb'

      try {

        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        };

        const moviegenres = await res.json();
        // console.log(moviegenres.genres);

        setmovieGenre(moviegenres.genres);


      } catch (error) {
        console.log(error)
      }


    }

    fetchgenres();

  }, [])



  useEffect(() => {

    if (!debouncedQuery || debouncedQuery.length < 2) {
      setMovies([]);
      return;
    }



    async function fetchMovies() {

      const API_KEY = '3db7bd73a79fda6cd693c48b3e25eacb'

      try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedQuery}`);

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        };

        const data = await res.json();
        const searchmovie = data.results;
        // console.log(searchmovie)
        setMovies(searchmovie)


      } catch (error) {
        console.log(error)
      }



    };

    fetchMovies();

  }, [debouncedQuery]);



  // const movieids = movies.map(gen => gen.genre_ids)

  // console.log(movieids)

  // const genreid = moviegenre.map(gen => gen.id)

  // console.log(genreid)







  useEffect(() => {

    // if (!movies.length || !moviegenre.length) {
    //   return;
    // }

    const updated = movies.map(movie => {

      let genreNames = [];

      if (movie.genre_ids) {
        for (let id of movie.genre_ids) {
          const found = moviegenre.find(g => g.id === id);
          console.log(found)
          if (found) {
            genreNames.push({
              id: found.id,
              name: found.name,
            });
          }
        }
      }


      return {
        ...movie,
        genres: genreNames
      };

    });

    setFinalmovies(updated);

  }, [movies, moviegenre]);








  return (

    <>

      <div className="text-center py-[10px] h-[100vh] flex justify-center overflow-scroll bg-black text-amber-50 ">
        <div>
          <button className="py-[20px] w-[300px] bg-[blue] mb-[10px] mt-[80px]">search movies here</button>
          <div className="flex flex-col justify-center items-center">
            <input
              className="md:w-[50vw] h-[50px] border border-red-600 px-[20px] mb-[20px]"
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {finalmovies.map((movie) => (
            <ul className="px-[12px] sm:w-[100vw] md:w-[50vw] flex gap-5 py-[10px]">
              <li className="h-[220px] w-[130px]" key={movie.id}>
                <Card movie={movie} />
                <button onClick={() => addtowatchlist(movie)} className="bg-[#13af73] py-[5px] px-[2px] mt-[5px] rounded-[8px]">Add to watchlist</button>
              </li>
              <li className="px-[5px] py-[5px]">
                <p>{movie.title}</p>
                <p>{movie.release_date}</p>
              </li>
            </ul>
          ))}

        </div>



        {/* <div className="px-[12px] w-[80vw] flex flex-col h-[60vh] overflow-scroll gap-3 justify-center">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie}/>
        ))}
      </div> */}
      </div>
    </>

  );
}


