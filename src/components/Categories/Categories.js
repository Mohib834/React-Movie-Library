import React, { useEffect, useState } from 'react';
import classes from './Categories.scss';
import uuidv1 from 'uuid/v1';
import Title from '../Ui/Title/Title';

const Categories = (props) => {

    const [categories, setCategories] = useState([]);
    const [req, setReq] = useState(false)

    useEffect(() => {
        setReq(true);

        let categoryArr = []
        // props.genres.map(genre => console.log(genre.id))
        if (req) {
            let promises = props.genres.map((genre) => {
                return props.getGenreMovies(genre.id, 1);
            })

            Promise.all(promises)
                .then(response => {
                    categoryArr = { categoryNames: props.genres, categoriesMovies: response }
                    setCategories(categoryArr)
                })
                .catch(err => console.log(err));
        }
        return () => {
            setReq(false);
        }
    }, [req, props])

    const baseUrl = 'http://image.tmdb.org/t/p/w1280';

    if (categories.length === 0) {
        return null;
    }

    return (
        <div className={classes.Categories}>
            <Title>Categories</Title>
            <div className={classes.Categories__list}>
                {categories.categoriesMovies.map((results, idx) => {
                    const result = results.data.results[7]; // 8th movie in every genre
                    return (<div key={uuidv1()} className={classes.Categories__category}>
                        <img src={baseUrl + result.backdrop_path} alt="" />
                        <h3 className={classes.Categories__name}>{categories.categoryNames[idx].name}</h3>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default Categories;