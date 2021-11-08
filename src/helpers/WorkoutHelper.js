// Import react module and components
import axios from 'axios';

/**
 * 
 * Workout state handler  
 * @returns void
 */
export default function useWorkoutState() {
    /**
     * Fetches exercises from given params and/or the external API
     * @param {*} muscleId 
     * @param {*} equipment 
     * @param {*} exerciseCatagories 
     * @param {*} withImages 
     * @returns {array|promise} exercises
     */
    const fetchExercises = async (muscleId, equipment, exerciseCatagories, withImages = false) => {
        try {
            // create a URLSearchParam object so its possible to pass multiple the same keys with different values
            const apiParams = new URLSearchParams();
            apiParams.append("language", 2); // 2 = english, default is german
            apiParams.append("limit", 50); // default is 20
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
            // If withImages is true this means we need to fetch the images with everyExercise
            const promises = data.results.map(async exercise => {
                const image = await fetchExerciseImg(exercise.exercise_base).then((result) => {
                    return result;
                });
                exercise.image = image;
                return exercise;
            });
            // wait till all promises are resolved
            const exercisesWithImage = await Promise.all(promises);
            // after the promises are resolved return the exercises with images
            return exercisesWithImage;
        } catch (e) {
            // if something goes wrong do nothing
            console.log(e);
            return [];
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
     * Generates workout advice based on given params
     * @param {*} exerciseCatagory 
     * @param {*} equipment 
     * @param {*} comment 
     */
    const generateWorkoutAdvice = async (exerciseCatagory, equipment, comment) => {
        if (exerciseCatagory === 4) {
            return { comment: comment };
        } else if (exerciseCatagory === 1) {
            const cardioList = equipment === 7
                ? [{ name: 'brisk walking' }, { name: 'jogging' }, { name: 'swimming' }, { name: 'cycling' }, { name: 'jumping rope' }, { name: 'playing soccer/kick ball' }, { name: 'roller blading' }, { name: 'skate boarding' }]
                : [{ name: 'Treadmill' }, { name: 'Stepping machine' }, { name: 'Stationairy cycle' }, { name: 'Rowing machine' }, { name: 'Stair climber' }];
            // get random exercises from the cardio list
            const exercises = cardioList.sort(() => .5 - Math.random()).slice(0, 2);
            return { comment: comment, workout: exercises };
        } else {
            const exerciseCatagories = getExerciseCatagories(exerciseCatagory);
            // await the possible fetchExercises since it can contain an unhandles promise
            const exerciseList = await fetchExercises(null, equipment, exerciseCatagories);
            // Use sorting algo to shuffle the array, use slice with a base from 0 to maximum 8 to get max 8 exercises
            const exercises = exerciseList.sort(() => .5 - Math.random()).slice(0, 8)
            return comment ? { comment: comment, workout: exercises } : { workout: exercises };;
        }
    }

    return {
        fetchExercises,
        fetchExerciseImg,
        fetchExerciseMuscles,
        generateWorkoutAdvice,
    }
}