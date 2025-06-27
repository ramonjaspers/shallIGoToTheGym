// imports
// modules/dependencies
import React, { useEffect, useState, useContext } from 'react';
import useQuestionState from '../helpers/QuestionState.js';
import useWorkoutState from '../helpers/WorkoutHelper.js';
import Exercise from '../components/Exercise.js';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { AuthContext } from '../context/AuthContext.js';
// style import
import '../assets/styles/Quiz.css'

export default function Quiz() {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    getQuestion,
    handleAnswer,
  } = useQuestionState();
  const { generateWorkoutAdvice, storeWorkout } = useWorkoutState();
  const { user } = useContext(AuthContext)
  const [workout, setWorkout] = useState({ exercises: null, comment: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const [userNotice, setUserNotice] = useState('');
  const navigate = useNavigate();

  /**
   * On mount get the current question if there is none
   */
  useEffect(() => {
    if (!currentQuestion.answerOptions.length > 0) {
      const initialQuestion = getQuestion(currentQuestion.questionScore);
      setCurrentQuestion(initialQuestion);
    }
  });

  /**
   * 
   * Handles the the onlick for a question
   * @param {object} userInput html field values aliased by name
   */
  const onclickHandler = async (userInput) => {
    // Handle the user input
    const result = await handleAnswer(userInput);
    if (result.catagory !== undefined
      && result.equipment !== undefined
      && result.comment !== undefined
    ) {
      setIsProcessing(true);
      // If we recieved an object with the props needed fetch workout advice
      const advice = await generateWorkoutAdvice(result.catagory, result.equipment, result.comment);
      if (advice.error) {
        // if and error is set we should show this to the user
        setUserNotice("Something went wrong fetching the exercises, try again later!");
      } else {
        // Set the workout to be shown
        setWorkout({ 'exercises': advice.workout, 'comment': advice.comment });
        if (user) {
          // if a user is set we also want to store the workout for later use
          storeWorkout(advice, user.id);
        }
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className='content'>
      <div className='container'>
        <div className='back-button' onClick={() => navigate('/')}>&#8592;</div>
        <div className='container-content'>
          {isProcessing ?
            <>
              <h6> Loading exercises... </h6>
              <TailSpin color="#00BFFF" height={'10vw'} width={'10vw'} />
            </>
            : <>
              {!userNotice ?
                <>
                  {/* if workout comment is set or exercises show result */}
                  {!workout.comment && !workout.exercises ?
                    <>
                      {/* no workout is set nor userNotice, we show the questions */}
                      <h4>Progress {currentQuestion.questionScore / (questions.length) * 100}%</h4>
                      <h5>{currentQuestion.questionText}</h5>
                      {currentQuestion.answerOptions.map((option, key) => (
                        <button className='question-answer' key={key} onClick={() => onclickHandler(option)}>{option.text}</button>
                      ))}
                    </>
                    :
                    <>
                      {/* workout is set and there is no user notice, show the advice */}
                      <h2>Result</h2>
                      {workout.comment && <h4>{workout.comment}</h4>}
                      {!user &&
                        <>
                          {/* User is not set, show login option */}
                          <p>You are currently not logged in, this means your workout will not be saved to your profile. Login anyways and store your workout to your profile?</p>
                          {/* Pushing to the history with LocationDescriptorObject for state binding */}
                          <button className='default-button' onClick={() => { navigate('/login', { state: { exercises: workout.exercises } }) }}>Login</button>
                        </>
                      }
                      <p><b>Not happy with the result?</b></p>
                      {/** 
                         *navigate(-1) forces a redirect to the last set history value. 
                         *On redirect we also lose the states which we want to start over.
                         **/}
                      <button className='default-button' onClick={() => navigate(-1)}>Try again</button>
                      {workout.exercises && workout.exercises.length > 0 &&
                        <>
                          <h5>Give the following exercises a try</h5>
                          {workout.exercises.map(exercise =>
                            <Exercise key={exercise.id} exercise={exercise} />
                          )}
                        </>
                      }
                    </>
                  }
                </>
                :
                <>
                  {/* userNotice is set, show notice message */}
                  <h6 className='error-message'>{userNotice}</h6>
                </>
              }
            </>
          }
        </div>
      </div>
    </div>
  );
}
