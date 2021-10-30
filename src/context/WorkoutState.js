// Import react module and components
import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import helpers
export const WorkoutContext = createContext(null);

/**
 * 
 * Workout state for the app 
 * @returns void
 */
export default function useWorkoutState() {
    // Set default states
    const [workout, setWorkout] = useState({ user: null, exercises: {} });
    const [exercises, setExercises] = useState([]);

    const history = useHistory();


    /**
     * Fetches exercises based on given muscle
     * 
     * @param {string} muscleId
     */
    const fetchExercises = (muscleId) => {
        axios.get(`https://wger.de/api/v2/exercise/?muscles=${muscleId}&language=2`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(({ data }) => {
            // Set the set the exercises
            setExercises(data.results)
        }).catch((e) => {
            // if something goes wrong throw an error
            console.log(e);
            throw new Error('Fetching the exercises failed.');
        });
    }


    /**
     * 
     * @param {int|null} muscleId 
     * @returns {array}
     */
    const fetchExerciseMuscles = async (muscleId) => {
        const url = muscleId ? `https://wger.de/api/v2/muscle/${muscleId}/?language=2` : `https://wger.de/api/v2/muscle/?language=2`
        return axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(({ data }) => {
            return muscleId ? data : data.results;
        }).catch((e) => {
            // if something goes wrong throw an error
            console.log(e);
            throw new Error('Fetching the muscles failed.');
        });
    }


    const fetchExerciseImg = async (exercise) => {
        try {
            const { data } = await axios.get(`https://wger.de/api/v2/exerciseimage/?exercise_base=${exercise}&language=2`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const imageObj = data ? data.results.pop() : false;
            return imageObj ? imageObj.image : '';
        } catch (e) {
            // if something goes wrong we do nothing
            console.log(e);
        }
    }


    return {
        workout,
        exercises,
        setWorkout,
        fetchExercises,
        fetchExerciseImg,
        fetchExerciseMuscles,
    }
}