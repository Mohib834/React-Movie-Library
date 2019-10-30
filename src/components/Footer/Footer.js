import React from 'react'
import classes from './Footer.scss';
import tmdbLogo from '../../assets/img/tmdb.svg'

const footer = (props) => {
    return (<div className={classes.Footer}>
        <div className={classes.Container}>
            <div className={classes.Footer__copyright}>
                Copyright &copy; Mohib Arshi
            </div>
            <img src={tmdbLogo} alt="" className={classes.Footer__img} />
        </div>
    </div>)
}


export default footer;