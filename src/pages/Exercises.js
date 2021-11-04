// Import react module and components
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Exercise from '../components/Exercise';
import useWorkoutState from '../helpers/WorkoutState';
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
        const fetchMuscles = async () => {
            try {
                const result = await fetchExerciseMuscles();
                setMuscles(result);
            } catch (e) {
                setError(e);
            }
        };
        fetchMuscles();
    }, []);


    return (
        <div id='content'>
            <div className='container'>
                <div className='backButton' onClick={() => history.push('/')}>&#8592; </div>
                <div className='containerContent'>
                    <h4 className='containerTitle'>Find exercises</h4>
                    <div id='exerciseSelector'>
                        <select onChange={(e) => fetchExercises(e.target.value, true)}>
                            <option key={null} value='-'>Select a muscle</option>
                            {muscles.map(muscle =>
                                <option key={muscle.id} value={muscle.id}>{muscle.name}</option>
                            )};
                        </select>
                        {error && <p className='errMssg'>{error}</p>}
                    </div>
                    {exercises.length > 1 &&
                        <>
                            <p>To search for the exercise, just click on the exercise of choice.</p>
                            {exercises.map(exercise =>
                                <Exercise key={exercise.id} exercise={exercise} />
                            )}
                        </>
                    }
                </div>
            </div>
        </div>
    );
}