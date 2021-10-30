import React, { useState, useEffect } from 'react';
import useWorkoutState from '../context/WorkoutState';

// import page style
import '../assets/styles/Exercise.css';
// import image
import noImage from '../assets/images/noImage.png';

export default function Exercise({ exercise }) {
    const [image, setImage] = useState(null);
    const [muscles, setMuscles] = useState([]);

    const { fetchExerciseImg } = useWorkoutState();

    useEffect(() => {
        async function fetchData() {
            let muscleNames = [];
            try {
                const url = await fetchExerciseImg(exercise.id);
                console.log(muscleNames);
                setImage(url);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [exercise]);



    return (
        <div class='exerciseWrapper'>
            {image
                ? <img class='exerciseImage' alt={exercise.name} src={image}></img>
                : <img class='exerciseImage' alt='no image available' src={noImage}></img>
            }
            <div class='exerciseDetails'>
                <h3>{exercise.name}</h3>
            </div>

        </div>
    );
}
