import React, { Component } from 'react';
import tmdbApi from '../../api/tmdb';
import { Switch, Route, Redirect } from 'react-router-dom';
import { TimelineLite, Power3 } from 'gsap';

import SearchBar from '../SearchBar/SearchBar';
import MoviesBox from '../MoviesBox/MoviesBox'
import classes from './Layout.scss';
import Categories from '../../components/Categories/Categories';
import Movie from '../Movie/Movie';
import MoviesFeatured from '../../components/MoviesFeatured/MoviesFeatured';
import Navbar from '../../components/Navbar/Navbar';


// All state will be managed here.

class Layout extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            genres: [],
            featuredMovies: [],
            isLoading: false,
            navOpen: false,
            hideSearchBar: false
        }
    }

    componentDidMount() {
        const tl = new TimelineLite();

        // Get the featured Movies
        this.getFeaturedMoviesHandler();

        // Getting the movie genre list
        tmdbApi.get('/genre/movie/list')
            .then(response => {
                this.setState({ genres: response.data.genres }, () => {
                    tl.to(this.layout, '.3', { opacity: 1, visibility: 'visible' });
                })
            })
            .catch(err => console.log(err))

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
                movies: response.data.results
            }, this.setState({ isLoading: false }));
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
        this.setState({ isLoading: true })

        tmdbApi.get('/discover/movie', {
            params: {
                with_genres: genreId.toString(),
                page
            }
        }).then(response => {
            this.setState({ movies: response.data.results, backgroundImgUrl: '' }, () => this.setState({ isLoading: false }))
        }).catch(err => console.log(err));
    }

    getMovieByIdHandler = (movieId, cb) => { // Using the callback so that i can get the data / error from the movie component.
        this.setState({ isLoading: true })
        tmdbApi.get(`/movie/${movieId}`, {
            params: {
                append_to_response: 'credits'
            }
        })
            .then(response => {
                this.setState({ isLoading: false, })
                cb(null, response)
            })
            .catch(err => cb(err, null));
    }

    getFeaturedMoviesHandler = () => {
        tmdbApi.get('/discover/movie', {
            params: {
                'vote_average.gte': 8
            }
        }).then(response => this.setState({ featuredMovies: response.data.results }))
            .catch(err => console.log(err));
    }

    openNavHandler = () => {
        // Side Nav Animation 
        const tl = new TimelineLite();
        if (!this.state.navOpen) {
            tl.to(this.aside, 1, { x: '0%' });
            this.setState({ navOpen: true })
        } else {
            tl.to(this.aside, 1, { x: '-100%' });
            this.setState({ navOpen: false })
        }
    }

    hideSearchBarHandler = (hide) => {
        this.setState({
            hideSearchBar: hide
        })
    }

    render() {
        const { movies, genres, featuredMovies, isLoading, hideSearchBar } = this.state;
        return (
            <div className={classes.Layout} ref={el => this.layout = el} >
                <aside className={classes.Layout__left} ref={el => this.aside = el}>
                    <Categories getDiscoverMovies={this.getDiscoverMoviesHandler} getGenreMovies={this.getGenreMoviesHandler} genres={genres} />
                </aside>


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
                                <SearchBar openNav={this.openNavHandler} searchMovie={this.searchMovieHandler} />
                                <div className={classes.Layout__featured}>
                                    <MoviesFeatured featuredMovies={featuredMovies} />
                                </div>
                                <MoviesBox getDiscoverMovies={this.getDiscoverMoviesHandler} type="popular" category="popular" />
                                <MoviesBox getDiscoverMovies={this.getDiscoverMoviesHandler} type="top_rated" category="top rated" />
                                <MoviesBox getDiscoverMovies={this.getDiscoverMoviesHandler} type="upcoming" category="upcoming" />
                            </React.Fragment>
                        )} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default Layout;