import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Button.scss';


const button = (props) => {
    return (
        <Link to={props.link} className={[classes.Button, classes[`Button__${props.btnType}`]].join(' ')}>
            {props.children}
        </Link>
    )
}

export default button;