import React, { useEffect } from 'react';
import classes from './MoviesFeatured.scss';
import Slider from 'react-slick';
import MovieFeatured from './MovieFeatured/MovieFeatured';
import { Link } from 'react-router-dom';

const moviesFeatured = (props) => {
    const settings = {
        autoplay: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        speed: 1000,
        autoplaySpeed: 6000,
    }

    return (
        <div className={classes.MoviesFeatured}>
            <Slider {...settings}>
                {props.featuredMovies.map(movie => (
                    <Link to={'/movie/' + movie.id}>
                        <MovieFeatured movie={movie} />
                    </Link>
                ))}
            </Slider>
        </div>
    )
}

export default moviesFeatured;