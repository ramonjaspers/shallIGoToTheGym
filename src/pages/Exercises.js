// Import react module and components
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Exercise from '../components/Exercise';
import useWorkoutState from '../context/WorkoutState';
// import page style
import '../assets/styles/Exercises.css';


export default function Exercises() {
    const { fetchExerciseMuscles, fetchExercises, exercises } = useWorkoutState();

    const history = useHistory();
    const [muscles, setMuscles] = useState([]);
    const [error, setError] = useState('');

    /**
     * Fetches the muscles
     */
    useEffect(() => {
        // We wrap the fetching of muscles in a function so we can call it asynchronous
        const fetchData = async () => {
            try {
                const muscles = await fetchExerciseMuscles();
                console.log(muscles)
                setMuscles(muscles);
            } catch (e) {
                setError(e);
            }
        };
        fetchData();
    }, []);


    return (
        <>
        <div id='content'>
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
                            <Exercise key={exercise.id} exercise={exercise} />
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}