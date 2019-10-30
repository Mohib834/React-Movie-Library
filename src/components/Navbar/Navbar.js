import React from 'react';
import classes from './Navbar.scss';
import Hamburger from '../Ui/Hamburger/Hamburger';
import SearchBar from '../../containers/SearchBar/SearchBar';

const navbar = (props) => {
    return (<div className={classes.Navbar}>
        <div className={classes.Navbar__content}>
            <Hamburger openNav={props.openNav} />
            <SearchBar />
        </div>
    </div>)
}

export default navbar;