import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import { useNavigate } from "react-router-dom";


export function Navbar() {

    const [transform, setTransform] = useState(true)

    const navigate = useNavigate();



    return (
        <>
            <div className="block md:hidden py-[10px] fixed transla top-0 z-80">
                <button className="text-[#14c156]" onClick={() => setTransform(false)}><Menu size={35} /></button>
            </div>
            <div className={`block md:hidden ${transform ? "translate-x-[-100%]" : "translate-x-[0%]"} transition-all duration-300 ease-in-out fixed top-0 z-80 h-[100vh] w-[80vw] bg-[#14c156]`}>
                <div className="flex justify-end">
                    <button className="h-[50px] w-[50px] bg-[#14c156] text-center" onClick={() => setTransform(true)}>
                    <X size={35} />
                </button>
                </div>
                <div className="text-center py-[10px] border-2 border-black" onClick={() => {navigate('/') ; setTransform(true)}}>Home</div>
                <div className="text-center py-[10px] my-[5px] border-2 border-black" onClick={() => {navigate('/watchlist') ; setTransform(true)}}>Watchlist</div>
                <div className="text-center py-[10px] border-2 border-black" onClick={() => {navigate('/search') ; setTransform(true)}}>Search</div>
            </div>
            <div className="w-[100vw] hidden md:flex bg-[#0000009e] py-[15px] flex-wrap justify-around fixed top-0 z-70">
                <div className="text-[red] text-[30px]">Neoflix</div>
                <div className="flex gap-5 py-[8px] text-emerald-500 text-[20px]">
                    <div className="cursor-pointer" onClick={() => navigate('/')}>Home</div>
                    <div className="cursor-pointer" onClick={() => navigate('/watchlist')}>Watchlist</div>
                    <div className="cursor-pointer" onClick={() => navigate('/search')}>Search</div>
                </div>
            </div>
        </>

    )
}