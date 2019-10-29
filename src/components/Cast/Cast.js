import React, { useEffect, useContext } from 'react';
import classes from './Cast.scss';
import CastItem from './CastItem/CastItem';
import Slider from 'react-slick';

const Cast = (props) => {
    console.log(props.credits)
    const settings = {
        arrows: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        className: classes.slickSlider
    }

    if (!props.credits) {
        return <div>Loading...</div>
    }

    const castItems = props.credits.cast.map(c => <CastItem cast={c} />);

    return (
        <div className={classes.Cast}>
            <strong>Cast</strong>
            <div className={classes.Cast__container}>
                <Slider {...settings}>
                    {castItems}
                </Slider>
            </div>
        </div>
    )
}

export default Cast;