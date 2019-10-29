import React from 'react';
import classes from './CastItem.scss';
import noImg from '../../../assets/img/no-image.png';

const castItem = (props) => {
    const baseUrl = 'http://image.tmdb.org/t/p/w185'
    const { profile_path, name } = props.cast;
    const nameArr = name.split(' ');
    
    return (
        <div className={classes.CastItem}>
            <div className={classes.CastItem__imgContainer}>
                <img src={profile_path ? baseUrl + profile_path : noImg} className={!profile_path && classes.noImg} alt='Cast image' />
            </div>
            <div className={classes.CastItem__name}>
                {nameArr[0]}
                <br />
                {nameArr[1]}
            </div>
        </div>
    )
}

export default castItem;