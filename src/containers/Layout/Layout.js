import React, { Component } from 'react';
import tmdbApi from '../../api/tmdb';
import { Switch, Route } from 'react-router-dom';

import MoviesBox from '../MoviesBox/MoviesBox'
import classes from './Layout.scss';
import Categories from '../../components/Categories/Categories';
import Movie from '../Movie/Movie';
import MoviesFeatured from '../../components/MoviesFeatured/MoviesFeatured';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';


// All state will be managed here.

class Layout extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            genres: [],
            featuredMovies: [],
            isLoading: false,
            hideSearchBar: false
        }
    }

    async componentDidMount() {
        this.setState({
            isLoading: true
        })
        // Getting Featured Movies
        const responseFeatured = await tmdbApi.get('/discover/movie', {
            params: {
                'vote_average.gte': 8
            }
        })
        // Getting the movie genre list
        const responseGenreList = await tmdbApi.get('/genre/movie/list')

        this.setState({
            featuredMovies: responseFeatured.data.results,
            genres: responseGenreList.data.genres,
            isLoading: false
        })

    }

    searchMovieHandler = (query, page = 1) => {
        this.setState({ isLoading: true })
        tmdbApi.get('/search/movie', {
            params: {
                query,
                page
            }
        }).then(response => {
            this.setState({
                movies: response.data.results,
                isLoading: false
            });
        })
            .catch(err => console.log(err))
    }

    getDiscoverMoviesHandler = (discover, page = 1, cb) => {
        tmdbApi.get(`/movie/${discover}`, {
            page,
        })
            .then(response => cb(null, response))
            .catch(err => cb(err, null));
    }

    getGenreMoviesHandler = (genreId, page = 1) => {
        return tmdbApi.get('/discover/movie', {
            params: {
                with_genres: genreId.toString(),
                page
            }
        })
    }

    getMovieByIdHandler = (movieId, cb) => { // Using the callback so that i can get the data / error from the movie component.
        tmdbApi.get(`/movie/${movieId}`, {
            params: {
                append_to_response: 'credits'
            }
        })
            .then(response => {
                cb(null, response)
            })
            .catch(err => cb(err, null));
    }


    hideSearchBarHandler = (hide) => {
        this.setState({
            hideSearchBar: hide
        })
    }

    render() {
        const { genres, featuredMovies, isLoading, hideSearchBar } = this.state;
        if (isLoading) {
            return (<div>Loading...</div>)
        }
        return (
            <div className={classes.Layout} ref={el => this.layout = el} >
                <main className={classes.Layout__right}>
                    <Switch>
                        {/* <Route path="/discover/popular" render={() => <MoviesBox  category="popular" />} />
                            <Route path="/discover/top_rated" render={() => <MoviesBox  category="top rated" />} />
                        <Route path="/discover/upcoming" render={() => <MoviesBox  category="upcoming" />} /> */}

                        {/* {this.state.genres.map(genre => (
                            <Route key={uuidv1()} exact path={`/genre/${genre.name.toLowerCase()}`} render={() => <MoviesBox movies={movies} isLoading={isLoading} category={genre.name} />} />
                        ))} */}

                        <Route path="/movie/:id" render={(routeProps) => <Movie getMovieById={this.getMovieByIdHandler} {...routeProps} isLoading={isLoading} hideSearchBar={this.hideSearchBarHandler} />} />

                        <Route path="/" render={() => ( // Route for '/'
                            <React.Fragment>
                                <Navbar openNav={this.openNavHandler} />
                                <div className={classes.Layout__featured}>
                                    <MoviesFeatured featuredMovies={featuredMovies} />
                                </div>
                                <MoviesBox getDiscoverMovies={this.getDiscoverMoviesHandler} type="popular" category="popular" />
                                <MoviesBox getDiscoverMovies={this.getDiscoverMoviesHandler} type="top_rated" category="top rated" />
                                <MoviesBox getDiscoverMovies={this.getDiscoverMoviesHandler} type="upcoming" category="upcoming" />
                                <Categories genres={genres} getGenreMovies={this.getGenreMoviesHandler} />
                            </React.Fragment>
                        )} />
                    </Switch>
                    {!hideSearchBar && <Footer />}
                </main>
            </div>
        )
    }
}

export default Layout;