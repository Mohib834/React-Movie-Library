import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Categories.scss';
import tmdbIcon from '../../assets/img/tmdb.png';

const categories = (props) => {
    return (
        <div className={classes.Categories}>
            <div className={classes.Categories__title}>
                MovieBox
                </div>
            <div className={classes.Categories__secondaryTitle}>Browse MovieBox</div>
            <ul>
                <NavLink activeClassName={classes.activeCategory} to="/discover/popular" onClick={() => props.getDiscoverMovies('popular')}>
                    <li><i className="fas fa-fire"></i>Popular</li>
                </NavLink>

                <NavLink activeClassName={classes.activeCategory} to="/discover/top_rated" onClick={() => props.getDiscoverMovies('top_rated')}>
                    <li><i className="fas fa-chart-line"></i>Top Rated</li>
                </NavLink>

                <NavLink activeClassName={classes.activeCategory} to="/discover/upcoming" onClick={() => props.getDiscoverMovies('upcoming')}>
                    <li><i className="fas fa-file-upload"></i>Upcoming</li>
                </NavLink>
            </ul>
            <div className={classes.Categories__secondaryTitle}>Genres</div>
            <ul>
                {props.genres.map(genre => (
                    <NavLink activeClassName={classes.activeCategory} key={genre.id} to={`/genre/${genre.name.toLowerCase()}`} onClick={() => props.getGenreMovies(genre.id)}>
                        <li><i className="fas fa-ticket-alt"></i>{genre.name}</li>
                    </NavLink>
                ))}
            </ul>
            <ul>
                <li className={classes.tmdbContainer}>
                    <img src={tmdbIcon} alt="" />
                </li>
                <li>
                    Copyright &copy; Mohib Arshi
                </li>
            </ul>
        </div>
    )
}

export default categories;