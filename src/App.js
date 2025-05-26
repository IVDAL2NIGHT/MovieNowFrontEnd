import './App.css';
import api from './api/axiosConfig';
import React, { useEffect, useState } from 'react';
import Layout from './components/layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/header';
import Trailer from './components/trailer/trailer';

function App() {

  const [movies, setMovies] = useState([]);




  const getMovies = async () => {

    try
    {
      const response = await api.get('/api/v1/movies');

      setMovies(response.data);

  } 
  catch (error) 
  {
    console.error(error);
  }
     }

  useEffect(() => { 
    getMovies();
  } , []);


  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies}/>} ></Route>
            <Route path="/trailer/:ytTrailerId" element={<Trailer/>} ></Route>
            



          </Route>
        </Routes>


    </div>
  );
}

export default App;
