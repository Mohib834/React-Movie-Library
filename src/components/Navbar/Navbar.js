import React from 'react';
import classes from './Navbar.scss';
import Hamburger from '../Ui/Hamburger/Hamburger';

const navbar = (props) => {
    return (<div className={classes.Navbar}>
        <Hamburger openNav={props.openNav} />
    </div>)
}

export default navbar;