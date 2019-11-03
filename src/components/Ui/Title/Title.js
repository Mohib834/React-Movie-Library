import React, { Component } from 'react';
import classes from './Title.scss';
import Button from '../Button/Button';

const Title = (props) => {
    return (
        <div className={classes.Title}>
            <h2 className={classes.Title__title}>
                {props.children}
            </h2>
            {props.more && <Button link={props.link}>View More</Button>}
        </div>
    )
}

export default Title;