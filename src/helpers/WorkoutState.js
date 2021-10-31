// Import react module and components
import { useState } from 'react';
import axios from 'axios';


/**
 * 
 * Workout state for the app 
 * @returns void
 */
export default function useWorkoutState() {
    // Set default states
    const [workout, setWorkout] = useState({ userId: null, exercises: {} });
    const [exercises, setExercises] = useState([]);


    /**
     * Fetches exercises based on given muscle
     * 
     * @param {string} muscleId
     */
    const fetchExercises = async (muscleId, withImages = false) => {
        try {
            const { data } = await axios.get(`https://wger.de/api/v2/exercise/?muscles=${muscleId}&language=2`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (withImages) {
                const promises = data.results.map(async exercise => {
                    const image = await fetchExerciseImg(exercise.exercise_base).then((result) => {
                        return result;
                    });
                    exercise.image = image;
                    return exercise;
                });
                const exercisesWithImage = await Promise.all(promises);
                console.log(exercisesWithImage);

                setExercises(exercisesWithImage);
            } else {
                setExercises(data.results)
            }
            // Set the set the exercises
        } catch (e) {
            // if something goes wrong throw an error
            console.log(e);
            throw new Error('Fetching the exercises failed.');
        }
    }


    /**
     * 
     * @param {int|null} muscleId 
     * @returns {array}
     */
    const fetchExerciseMuscles = async (muscleId) => {
        const url = `https://wger.de/api/v2/muscle/${muscleId ?? ''}/?language=2`
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


    const fetchExerciseImg = async (exerciseId) => {
        try {
            const { data } = await axios.get(`https://wger.de/api/v2/exerciseimage/?exercise_base=${exerciseId}&is_main=True&/?luangauge=2`, {
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
        setExercises,
        setWorkout,
        fetchExercises,
        fetchExerciseImg,
        fetchExerciseMuscles,
    }
}