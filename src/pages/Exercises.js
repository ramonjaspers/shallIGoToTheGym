// Import react module and components
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// import page style
import '../assets/styles/Exercises.css';

export default function Exercises() {
    const history = useHistory();
    const [muscles, setMuscles] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState('');
    /**
     * Fetches the muscles
     */
    useEffect(() => {
        axios.get(`https://wger.de/api/v2/muscle/`)
            .then(({ data }) => {
                // Set the set the muscles
                setMuscles(data.results);
            }).catch((e) => {
                // if something goes wrong we make an error
                setError('Something went wrong, please try again later');
            });
    }, []);

    /**
     * Fetches exercises based on given muscle
     * 
     * @param {string} muscle 
     */
    const fetchExercises = (muscle) => {
        axios.get(`https://wger.de/api/v2/exercise/?muscles=${muscle}&langauge=1`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(({ data }) => {
            console.log(data);
            // Set the set the exercises
            setExercises(data.results);
        }).catch((e) => {
            // if something goes wrong we do nothing
            console.log(e);
        });
    }

    const getExerciseImg = (exercise) => {
        api/v2/exerciseimage/3/thumbnails/
    }

    return (
        <div id='pageWrapper'>
            <div class='container'>
                <div class='backButton' onClick={() => history.push('/')}>&#8592; </div>
                <div class='containerContent'>
                    <h3 class='containerTitle'>Find exercises</h3>
                    <div id='exerciseSelector'>
                        <select onChange={(e) => fetchExercises(e.target.value)}>
                            <option key={null} value='-'>Select a muscle</option>
                            {muscles.map(muscle =>
                                <option key={muscle.id} value={muscle.id}>{muscle.name}</option>
                            )};
                        </select>
                        {error && <p class='errMssg'>{error}</p>}
                    </div>
                    <div>
                        {exercises.map(exercise =>
                            <img></img>
                            <h5>{exercise.name}</h5>
                            <p>{exercise.muscles}</h5>
                        )};
                    </div>
                </div>
            </div>
        </div>
    );
}