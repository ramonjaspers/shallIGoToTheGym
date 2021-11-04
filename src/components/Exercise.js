import React from 'react';
// import page style
import '../assets/styles/Exercise.css';
// import image
import noImage from '../assets/images/noImage.png';

export default function Exercise({ exercise }) {
    return (
        <div className='exerciseWrapper'>
            {exercise.image
                ? <img className='exerciseImage' alt={exercise.name} src={exercise.image}></img>
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                : <img className='exerciseImage' alt='No image available' src={noImage}></img>
            }
            <div className='exerciseDetails' onClick={() => window.open(`https://google.com/search?q=${exercise.name}`)}>
                <h4>{exercise.name}</h4>
            </div>
        </div>
    );
}
