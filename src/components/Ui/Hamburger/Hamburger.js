import React from 'react';
import classes from './Hamburger.scss';

const hamburger = (props) => {
    return (
        <button className={`${classes.Hamburger} waves waves-light`} onClick={props.openNav}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default hamburger;