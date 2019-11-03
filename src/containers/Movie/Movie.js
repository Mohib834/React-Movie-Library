import React, { Component } from 'react';
import classes from './Movie.scss';
import Button from '../../components/Ui/Button/Button';
import Cast from '../../components/Cast/Cast';
import PageNavigation from '../../components/Ui/PageNavigation/PageNavigation';
import Tilt from 'react-tilt';
import truncate from '../../helperFunctions/truncate';

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.getMovieById(id, (error, response) => {
            if (error) return console.log(error);
            this.setState({ movie: response.data })
        })

        console.log(this.state);

        this.props.hideSearchBar(true);
    }

    componentWillUnmount() {
        this.props.hideSearchBar(false);
    }

    render() {

        const { title, overview, runtime, release_date, genres, credits, backdrop_path, poster_path } = this.state.movie;

        const { isLoading } = this.props;

        const styles = {
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, .7) 40%, rgba(0, 0, 0, 0.4)),url(http://image.tmdb.org/t/p/w1280/${backdrop_path})`,
        }

        const baseUrl = 'http://image.tmdb.org/t/p/w342';

        const options = {
            max: 25,     // max tilt rotation (degrees)
            perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
            scale: 1.01,      // 2 = 200%, 1.5 = 150%, etc..
            speed: 400,    // Speed of the enter/exit transition
            transition: true,   // Set a transition on enter/exit.
            axis: null,   // What axis should be disabled. Can be X or Y.
            reset: true,    // If the tilt effect has to be reset on exit.
            easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
        }

        if (isLoading) {
            return <div>Loading ...</div>
        }
        return (
            <div className={classes.Movie} style={styles}>
                <div className={classes.Movie__navigation}>
                    <PageNavigation />
                </div>
                <div className={classes.Movie__details}>
                    <div>
                        <h1 className={classes.Movie__title}>{title}</h1>
                        <div className={classes.extra}>
                            {genres && genres.map(genre => <span key={genre.id} className={classes.genre}>{genre.name}</span>)}
                            <span className={classes.box}>{release_date && release_date.split('-')[0]}</span> <span className={classes.box}>{runtime} min</span>
                        </div>
                        <p className={classes.Movie__synopsis}>
                            <strong>The Synopsis</strong>
                            {overview && truncate(overview, 40)}
                        </p>
                        <div className={classes.Movie__actions}>
                            <Button><i className="fas fa-play"></i> Play Trailer</Button>
                            <Button btnType="transparent">Imdb</Button>
                        </div>
                        <div className={classes.Movie__castDetails}>
                            <Cast credits={credits} />
                        </div>
                    </div>
                    <div className={classes.Movie__poster}>
                        <Tilt options={options}>
                            <img src={baseUrl + poster_path} alt="" />
                        </Tilt>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movie;