// Import react module and components
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

/**
 * 
 * Workout state handler  
 * @returns void
 */
export default function useWorkoutState() {
    // Set default states
    const { user } = useContext(AuthContext);
    const [workout, setWorkout] = useState([]);
    const [exercises, setExercises] = useState([]);


    /**
     * Fetches exercises based on given params
     * @param {int|null} muscleId 
     * @param {bool} withImages 
     * @param {int} equipment 
     * @param {array} exerciseCatagories
     */
    const fetchExercises = async (muscleId, withImages = false, equipment, exerciseCatagories) => {
        try {
            // create a URLSearchParam object so its possible to pass multiple the same keys with different values
            const apiParams = new URLSearchParams();
            apiParams.append("language", 2);
            muscleId && apiParams.append("muscles", muscleId);
            equipment && apiParams.append("equipment", equipment);

            if (exerciseCatagories && exerciseCatagories.length > 0) {
                exerciseCatagories.forEach(exerciseCatagory => {
                    apiParams.append("exerciseCatagory", exerciseCatagory);
                });
            }

            const { data } = await axios.get(`https://wger.de/api/v2/exercise/`, {
                params: apiParams,
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
        return axios.get(`https://wger.de/api/v2/muscle/${muscleId ?? ''}/?language=2`, {
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
            const { data } = await axios.get(`https://wger.de/api/v2/exerciseimage/`, {
                params: {
                    "exercise_base": exerciseId,
                    "language": 2,
                    "is_main": true,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const imageObj = data ? data.results.pop() : false;

            return imageObj ? imageObj.image : '';
        } catch (e) {
            // if something goes wrong, logg error and return false
            console.log(e);
            return false;
        }
    }

    /**
     * Call to clear the workout data since we do not want to alter the state out of this stateHandler
     */
    const clearWorkoutData = () => {
        setWorkout([]);
    }

    /**
     * catagory 2 = Lower body
     * catagory 3 = Lower body
     * source for integers used: wger.de/api/v2/exercisecategory
     * @param {*} catagory 
     * @returns {array} Catagory integers
     */
    const getExerciseCatagories = (catagory) => {
        if (catagory === 2) {
            return [14, 9, 10];
        }
        if (catagory === 3) {
            return [8, 12, 11, 13];
        }
        return [];
    }

    /**
     * Generates the workout advice based on given params and stores this in the state, and localStorage if a user is set
     * @param {*} exerciseCatagory 
     * @param {*} equipment 
     * @param {*} comment 
     */
    const generateWorkoutAdvice = async (exerciseCatagory, equipment, comment) => {
        if (exerciseCatagory === 4) {
            setWorkout([{ comment: comment }]);
        } else if (exerciseCatagory === 1) {
            const cardioList = equipment === 7
                ? ['brisk walking', 'jogging', 'swimming', 'cycling', 'jumping rope', 'playing soccer/kick ball', 'roller blading', 'skate boarding']
                : ['Treadmill', 'Stepping machine', 'Stationairy cycle', 'Rowing machine', 'Stair climber'];
            const firstExercise = cardioList[Math.floor(Math.random() * cardioList.length)];
            let secondExercise = cardioList[Math.floor(Math.random() * cardioList.length)];
            do {
                // Make sure we dont have duplicates
                secondExercise = cardioList[Math.floor(Math.random() * cardioList.length)];
            } while (firstExercise === secondExercise)
            setWorkout([{ comment: comment, workout: [firstExercise, secondExercise] }]);
        } else {
            const exerciseCatagories = getExerciseCatagories(exerciseCatagory);
            await fetchExercises(null, false, equipment, exerciseCatagories);
            const token = localStorage.getItem('token');
            if (user && user.id) {
                // set the workout in the localStorage for user usage
                const storedWorkout = localStorage.getItem('workout' + user.id);
                if (storedWorkout) {
                    localStorage.removeItem('workout' + user.id);
                }
                localStorage.setItem('workout' + user.id, { 'workout': workout });
            }
            setWorkout([{ comment: comment, workout: workout }])
        }
    }


    return {
        workout,
        clearWorkoutData,
        exercises,
        setExercises,
        fetchExercises,
        fetchExerciseImg,
        fetchExerciseMuscles,
        generateWorkoutAdvice,
    }
}