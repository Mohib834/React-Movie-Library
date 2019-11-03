import React from 'react';
import classes from './MoviesFeatured.scss';
import Slider from 'react-slick';
import MovieFeatured from './MovieFeatured/MovieFeatured';
import uuidv1 from 'uuid/v1';

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
                    <MovieFeatured key={uuidv1()} movie={movie} />
                ))}
            </Slider>
        </div>
    )
}

export default moviesFeatured;