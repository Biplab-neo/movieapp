import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Toaster } from 'react-hot-toast'

import { Movies } from '../components/movie'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Detail } from '../pages/detail'

import { Search } from '../pages/search'

import {Navbar} from '../components/navbar'

import { Watchlist } from '../pages/watchlist'


function App() {


  return (
    <>
    <Toaster/>
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Movies/>}/>
          <Route path='/search' element={<Search/>} />
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/watchlist' element={<Watchlist/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
