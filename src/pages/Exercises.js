// Import react module and components
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Exercise from '../components/Exercise';
import useWorkoutState from '../helpers/WorkoutHelper';
import Loader from 'react-loader-spinner';
// import BG image
import exercisesBG from '../assets/images/exercises.jpeg';

export default function Exercises() {
    const { fetchExerciseMuscles, fetchExercises } = useWorkoutState();
    const history = useHistory();
    const [muscles, setMuscles] = useState([]);
    const [error, setError] = useState('');
    const [exercises, setExercises] = useState({ exercises: [], processing: false });

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
                setError(e.message);
            }
        };
        fetchMuscles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [muscles]);


    /**
     * 
     * @param {SyntheticBaseEvent} e or event is the full node with the whole dataobject in it 
     */
    const getExercises = async (e) => {
        // Set the exercise state to processing
        setExercises({ ...exercises, processing: true });
        // e.target.value is the user selected value
        const result = await fetchExercises(e.target.value, null, []);
        // After the exercises are fetched set them in the state and toggle the processing off
        setExercises({ exercises: result, processing: false });
    }

    return (
        // Overwrite the default background
        <div className='content' style={{ backgroundImage: `url(${exercisesBG})` }}>
            <div className='container'>
                <div className='backButton' onClick={() => history.push('/')}>&#8592; </div>
                <div className='containerContent'>
                    <h4 className='containerTitle'>Find exercises</h4>
                    <div id='exerciseSelector'>
                        <select onChange={(e) => getExercises(e)}>
                            <option key={null} value='-'>Select a muscle</option>
                            {muscles.map(muscle =>
                                <option key={muscle.id} value={muscle.id}>{muscle.name}</option>
                            )};
                        </select>
                        {error && <p className='errMssg'>{error}</p>}
                    </div>
                    {exercises.processing &&
                        <Loader type="TailSpin" color="#00BFFF" height={'10vw'} width={'10vw'} />
                    }
                    {exercises.exercises.length > 1 && exercises.processing === false &&
                        <>
                            <p>To search for the exercise, just click on the exercise of choice.</p>
                            {exercises.exercises.map(exercise =>
                                <Exercise key={exercise.id} exercise={exercise} />
                            )}
                        </>
                    }
                </div>
            </div>
        </div>
    );
}