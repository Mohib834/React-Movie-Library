import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './PageNavigation.scss';
import { TimelineMax } from 'gsap';


const PageNavigation = (props) => {
    let arrow = null;
    useEffect(() => {
        const tl = new TimelineMax({ repeat: -1 });
        tl.to(arrow, 1, { x: -10 })
            .to(arrow, 1, { x: 0 })
    }, [])

    const handleClick = () => {
        props.history.goBack();
    }

    return (
        <div className={classes.PageNavigation}>
            <button
                ref={el => arrow = el}
                onClick={handleClick}
                className={classes.PageNavigation__btn}>
                &larr;
            </button>
        </div>
    )
}

export default withRouter(PageNavigation);