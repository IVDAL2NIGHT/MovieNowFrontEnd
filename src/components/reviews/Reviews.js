import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { username } from '../../api/axiosConfig';

import React from 'react'


const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    const ratingRef = useRef();

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;
        const rating = ratingRef.current.value;


        try
        {
             await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId, username:username});
             await api.post("/api/v1/rates",{imdbId:movieId, username:username, rating:rating});


            const updatedReviews = [...reviews, {body:rev.value, username:username, rating:rating} ];
    
            rev.value = "";
    
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
        



    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row>
            <Col>
                {/* Mostrar título de la película */}
                <div>
                    <strong>Título:</strong> {movie?.title ?? "N/A"}
                </div>
                {/* Mostrar título de la película */}
                <div>
                    <strong>Fecha de lanzamiento:</strong> {movie?.releaseDate ?? "N/A"}
                </div>
                {/* Mostrar géneros */}
                <div>
                    <strong>Géneros:</strong> {movie?.genres?.join(", ") ?? "N/A"}
                </div>
                {/* Mostrar average rating */}
                <div>
                    <strong>Calificación Media:</strong> {movie?.averageRating ?? "N/A"}
                </div>
                
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} ratingRef={ratingRef} labelText = "Comenta qué tal te pareció la película" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r, idx) => {
                        return(
                            <React.Fragment key={idx}>
                                <Row>
                                    <Col><strong>{r.username}</strong>:{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </React.Fragment>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews