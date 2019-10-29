import React, { Component } from 'react'
import classes from './SearchBar.scss';
import Hamburger from '../../components/Ui/Hamburger/Hamburger';
import { TimelineLite, Power3 } from 'gsap';

class SearchBar extends Component {
    state = {
        searchQuery: '',
        open: false
    }

    handleChange = e => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { searchQuery } = this.state
        this.props.searchMovie(searchQuery)
    }

    handleClick = () => {
        const tl = new TimelineLite();
        if (!this.state.open) {
            tl.to(this.searchbar, 1, { width: '60%', x: 10, ease: Power3.easeOut })
            this.setState({ open: true })
        } else {
            tl.to(this.searchbar, 1, { width: '0%', x: 0, ease: Power3.easeOut })
            this.setState({ open: false })
        }
    }

    render() {
        const { searchQuery } = this.state;
        return (
            <div className={classes.SearchBar}>
                <Hamburger openNav={this.props.openNav} />
                <form onSubmit={this.handleSubmit}>
                    <i onClick={this.handleClick} className="fa fa-search"></i>
                    <input ref={el => this.searchbar = el} type="text" value={searchQuery} placeholder="Search Movies" onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}

export default SearchBar;