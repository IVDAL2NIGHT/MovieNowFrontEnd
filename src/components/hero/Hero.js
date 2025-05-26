import React from "react";
import './Hero.css';
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useState } from "react";

const Hero = ({movies}) => {
    const navigate = useNavigate();
    const [showCount, setShowCount] = useState({});

     const handleToggleShow = (genre, total) => {
        setShowCount(prev => {
            // Si ya está mostrando todas, vuelve a 5 (ver menos)
            if ((prev[genre] || 5) >= total) {
                return { ...prev, [genre]: 5 };
            }
            // Si está mostrando 5, muestra todas (ver más)
            return { ...prev, [genre]: total };
        });
    };

    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`);
    }

    // Agrupa las películas por género DENTRO del componente
    const moviesByGenre = {};
    movies.forEach(movie => {
        if (Array.isArray(movie.genres)) {
            movie.genres.forEach(genre => {
                if (!moviesByGenre[genre]) moviesByGenre[genre] = [];
                moviesByGenre[genre].push(movie);
            });
        }
    });

    return (
        <div className="movie-carousel-container">
            <Carousel>
                {movies.map((movie) => (
                    <Paper key={movie.id}>
                        <div className="movie-card-container">
                            <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt="" /> 
                                    </div>
                                    <div className="movie-title">
                                        <h4>{movie.title}</h4>
                                    </div>
                                    <div className="movie-buttons-container">
                                        {movie.trailerLink && (
                                            <Link to={`/trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                <div className="play-button-icon-container">
                                                    <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                                                </div>
                                            </Link>
                                        )}
                                        <div className="movie-review-button-container">
                                            <Button variant="info" onClick={() => reviews(movie.imdbId)}>Reviews</Button>
                                        </div>
                                    </div>   
                                </div>   
                            </div>
                        </div>                                               
                    </Paper>
                ))}
            </Carousel>


            {/* Películas agrupadas por género */}
           <div className="movies-by-genre-section" style={{marginTop: "40px"}}>
                {Object.entries(moviesByGenre).map(([genre, genreMovies]) => {
                    const total = genreMovies.length;
                    const count = showCount[genre] || 5;
                    const showingAll = count >= total;
    return (
    <div key={String(genre)} style={{marginBottom: "30px"}}>
        <div className="genre-header-row">
            <h4>{genre}</h4>
            {total > 5 && (
                <button
                    className="show-more-button"
                    onClick={() => handleToggleShow(genre, total)}
                >
                    {showingAll ? "Ver menos" : "Ver más"}
                </button>
            )}
        </div>
        <div style={{display: "flex", gap: "16px", flexWrap: "wrap"}}>
            {genreMovies.slice(0, count).map(movie => (
                <div
                    key={movie.imdbId || movie.id || (movie.title + genre)}
                    style={{width: "140px", textAlign: "center", cursor: "pointer"}}
                    onClick={() => navigate(`/reviews/${movie.imdbId}`)}
                >
                    <img src={movie.poster} alt={movie.title} style={{width: "100%"}} />
                    <div>{movie.title}</div>
                </div>
            ))}
        </div>
    </div>
);
})}
            </div>
        </div>
    );
}



export default Hero;