import React from 'react';
import './MovieItem.css';

const MovieItem = (props) => {
    return (
        <div className="movie-item">
            <p>{props.title}</p>
            <div className="release-date">{props.releaseDate}</div>
            <div className="opening-text">{props.openingText}</div>
        </div>
    );
}

export default MovieItem;
