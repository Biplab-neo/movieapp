
import { Slider } from "./slider";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Modal } from "./modal";

import { Search } from "../pages/search";






import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade } from "swiper/modules";
import { Autoplay } from "swiper/modules";

export function Movies() {

  const [movies, setMovies] = useState([]);
  const [movies2, setMovies2] = useState([]);

  const [isopen, setIsopen] = useState(false);

  const handleopen = () => {

    setIsopen(true)

  }

  const handleclose = () => {

    setIsopen(false)

  }


  const navigate = useNavigate();


  useEffect(() => {

    const API_KEY = '3db7bd73a79fda6cd693c48b3e25eacb'
    const trending = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
    const toprated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    };

    async function getMovies() {
      try {
        // const response = await fetch(url,url2,options);
        // const data = await response.json();

        const [url, url2] = await Promise.all([
          fetch(trending),
          fetch(toprated),
        ])

        const data = await url.json();
        const data2 = await url2.json();

        // console.log(data)
        setMovies(data.results)
        setMovies2(data2.results)
      } catch (error) {
        console.error(error);
      }
    }

    getMovies();

  }, []);




  return (
    <>
      {/* <input
      type="text"
      /> */}
      <Modal
        onopen={isopen}
        open={handleopen}
        close={handleclose}
      >
        <Search />
      </Modal>

      <div className="relative h-[60vh] w-[100vw] bg-cover bg-top bg-[url('/images/fightclub.jpg')] text-center content-center">
        <h1 className="relative z-10 text-[yellow] text-[30px] md:text-[50px] py-[20px]">Search Your Favourite Movies Here</h1>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="flex justify-center px-[12px]">
          <div className="w-full max-w-md relative flex">
            <input
              type="text"
              placeholder="Search movies..."
              className="
          w-full
          px-10 py-3
          rounded-lg
          border border-gray-300
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
           text-emerald-500
        "
              onClick={() => navigate("/search")}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

        </div>

      </div>
      
        <h1 className="bg-black text-amber-50 text-center md:text-left text-[30px] pl-[0px] md:pl-[90px]">trending movies</h1>
        <Slider data={movies} />

      <h1 className="bg-[black] text-amber-50 text-[30px] text-center md:text-left pl-[0px] md:pl-[90px]">top rated</h1>
      <Slider data={movies2} />
    </>
  );
}


// 3db7bd73a79fda6cd693c48b3e25eacb
