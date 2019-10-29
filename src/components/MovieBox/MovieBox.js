import React, { useState } from 'react';
import classes from './MovieBox.scss';
import Button from '../../components/Ui/Button/Button';
import ImgLoader from '../../components/Ui/ImgLoader/ImgLoader';


const MovieBox = (props) => {
    const baseUrl = 'http://image.tmdb.org/t/p/w342';
    const [imgLoading, setImgLoading] = useState(true);

    const handleImgLoad = () => {
        setImgLoading(false);
    }

    return (
        <div className={classes.MovieBox}>
            <div className={classes.MovieBox__imgContainer}>
                <img src={baseUrl + props.movie.poster_path} alt="" onLoad={handleImgLoad} />
                {imgLoading && (
                    <div className={classes.MovieBox__imgContainerOverlay}>
                        <ImgLoader />
                    </div>
                )}
            </div>
            <div className={classes.overlay}>
                <i className="fa fa-star"></i>
                <div className={classes.ratings}>
                    {props.movie.vote_average} / 10
            </div>
                <Button btnType="primary" link={`/movie/${props.movie.id}`}>View Details</Button>
            </div>
            <div className={classes.MovieBox__title}>{props.movie.title}</div>
        </div>
    )
}

export default MovieBox;