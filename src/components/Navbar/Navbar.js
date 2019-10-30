import React from 'react';
import classes from './Navbar.scss';
import Hamburger from '../Ui/Hamburger/Hamburger';

const navbar = (props) => {
    return (<div className={classes.Navbar}>
        <div className={classes.Navbar__content}>
            <Hamburger openNav={props.openNav} />
        </div>
    </div>)
}

export default navbar;