import './App.css';
import api from './api/axiosConfig';
import React, { useEffect, useState } from 'react';
import Layout from './components/layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/header';
import Trailer from './components/trailer/trailer';
import Reviews from './components/reviews/Reviews'; 
import Login from './components/Login/Login'; // Añadir esta importación
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);




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

    const getMovieData = async (movieId) => {
      try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

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
            <Route path="/" element={<Home movies={movies}/>} />
            <Route path="/trailer/:ytTrailerId" element={<Trailer/>} />
            <Route path="/reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
            <Route path="/login" element={<Login />} /> {/* Añadir esta ruta */}
          </Route>
        </Routes>
    </div>
  );
}

export default App;
