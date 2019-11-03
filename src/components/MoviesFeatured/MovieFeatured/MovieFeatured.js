import React from 'react';
import classes from './MovieFeatured.scss';
import format from '../../../helperFunctions/format';
import truncate from '../../../helperFunctions/truncate';
import Button from '../../Ui/Button/Button';

const movieFeatured = (props) => {
    const styles = {
        backgroundImage: `radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.74) 73%, rgba(0,0,0,1) 100%),url(http://image.tmdb.org/t/p/w1280/${props.movie.backdrop_path})`,
    }
    return (<div className={classes.MovieFeatured} style={styles}>
        <div className={classes.MovieFeatured__details}>
            <h2 className={classes.MovieFeatured__title}>
                {props.movie.title}
            </h2>
            <p>
                <strong>Reviews :</strong> {format(props.movie.vote_count)}
            </p>
            <p className={classes.MovieFeatured__overview}>
                <strong>Overview :</strong> {truncate(props.movie.overview, 30)}
            </p>
            <Button link={'/movie/' + props.movie.id} btnType="transparent">More</Button>
        </div>
    </div>)
}

export default movieFeatured;