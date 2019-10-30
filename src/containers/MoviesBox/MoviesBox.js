import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classes from './MoviesBox.scss';
import loader from '../../assets/img/loader.gif';
import MovieBox from '../../components/MovieBox/MovieBox';
import Slider from 'react-slick';
import Button from '../../components/Ui/Button/Button';

class MoviesBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }
    componentDidMount() {
        this.props.getDiscoverMovies(this.props.type, 1, (err, response) => {
            if (err) {
                console.log(err);
            }
            this.setState({ movies: response.data.results })
        });
    }



    render() {
        const { isLoading } = this.props;

        const settings = {
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: true,
            speed: 1000,
            className: classes.slickSlider,
        }

        const { movies } = this.state;

        return (
            <Fragment>
                {isLoading ? <img src={loader} className={classes.Loader} alt="loading icon" /> : (
                    <div ref={el => this.container = el} className={classes.Container}>
                        <div className={classes.Container__top}>
                            <h2 className={classes.CategoryTitle}>
                                {this.props.category}
                            </h2>
                            <Button>View More</Button>
                        </div>
                        <div className={classes.MoviesBox}>
                            <Slider {...settings}>
                                {movies.map(movie => (
                                    <MovieBox key={movie.id} movie={movie} />
                                ))}
                            </Slider>
                        </div>
                    </div>
                )}
            </Fragment>
        )
    }
}

export default MoviesBox;