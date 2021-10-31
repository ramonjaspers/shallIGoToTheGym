import React from 'react';
// import page style
import '../assets/styles/Exercise.css';
// import image
import noImage from '../assets/images/noImage.png';

export default function Exercise({ exercise }) {
    return (
        <div class='exerciseWrapper'>
            {exercise.image
                ? <img class='exerciseImage' alt={exercise.name} src={exercise.image}></img>
                : <img class='exerciseImage' alt='no image available' src={noImage}></img>
            }
            <div class='exerciseDetails' onClick={() => window.open(`https://google.com/search?q=${exercise.name}`)}>
                <h4>{exercise.name}</h4>
            </div>

        </div>
    );
}
