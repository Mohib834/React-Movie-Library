import React from "react";
import classes from "./ImgLoader.scss";

const imgLoader = (props) => {
    return (
        <div className={classes.ImgLoader}>
            <svg className={classes.circular} viewBox="25 25 50 50">
                <circle
                    className={classes.path}
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                />
            </svg>
        </div>
    );
}

export default imgLoader;