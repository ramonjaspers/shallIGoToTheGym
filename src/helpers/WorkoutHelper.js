// Import react module and components
import { useState } from 'react';
import axios from 'axios';

/**
 * 
 * Workout state handler  
 * @returns void
 */
export default function useWorkoutState() {
    // Set default states

    /**
     * Fetches and sets exercises based on given params
     * @param {int|null} muscleId 
     * @param {bool} withImages 
     * @param {int} equipment 
     * @param {array} exerciseCatagories
     */
    const fetchExercises = async (muscleId, equipment, exerciseCatagories, withImages = false) => {
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
                return exercisesWithImage;
            } else {
                return data.results;
            }
            // Set the set the exercises
        } catch (e) {
            // if something goes wrong do nothing
            console.log(e);
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
            return { comment: comment };
        } else if (exerciseCatagory === 1) {
            const cardioList = equipment === 7
                ? ['brisk walking', 'jogging', 'swimming', 'cycling', 'jumping rope', 'playing soccer/kick ball', 'roller blading', 'skate boarding']
                : ['Treadmill', 'Stepping machine', 'Stationairy cycle', 'Rowing machine', 'Stair climber'];
            const firstExercise = cardioList[Math.floor(Math.random() * cardioList.length)];
            let secondExercise = cardioList[Math.floor(Math.random() * cardioList.length)];
            do {
                // Make sure we dont have duplicates
                secondExercise = cardioList[Math.floor(Math.random() * cardioList.length)];
            } while (firstExercise === secondExercise);
            return { comment: comment, workout: [firstExercise, secondExercise] };
        } else {
            const exerciseCatagories = getExerciseCatagories(exerciseCatagory);
            const workout = await fetchExercises(null, equipment, exerciseCatagories);

            return comment ? { comment: comment, workout: workout } : {workout}; ;
        }
    }


    return {
        fetchExercises,
        fetchExerciseImg,
        fetchExerciseMuscles,
        generateWorkoutAdvice,
    }
}