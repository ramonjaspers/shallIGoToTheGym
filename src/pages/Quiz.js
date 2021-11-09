// imports
// modules/dependencies
import React, { useEffect, useState, useContext } from 'react';
import useQuestionState from '../helpers/QuestionState';
import useWorkoutState from '../helpers/WorkoutHelper';
import Exercise from '../components/Exercise';
import { useHistory } from 'react-router';
// style import
import '../assets/styles/Quiz.css'
// image import
import defaultBG from '../assets/images/defaultBG.jpeg';
import Loader from 'react-loader-spinner';

export default function Quiz() {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    getQuestion,
    handleAnswer,
  } = useQuestionState();
  const { generateWorkoutAdvice, storeWorkout } = useWorkoutState();
  const [workout, setWorkout] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userNotice, setUserNotice] = useState('');
  const history = useHistory();


  useEffect(() => {
    if (!currentQuestion.answerOptions.length > 0) {
      const initialQuestion = getQuestion(currentQuestion.questionScore);
      setCurrentQuestion(initialQuestion);
    }
  }, [currentQuestion]);


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
        // if all is ok we would like to store the data
        setWorkout({ 'exercises': advice.workout, 'comment': advice.comment });
        storeWorkout(advice);
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className='content' style={{ backgroundImage: `url(${defaultBG})` }}>
      <div className='container'>
        <div className='backButton' onClick={() => history.push('/')}>&#8592;</div>
        <div className='containerContent'>
          {isProcessing
            ? <>
              <h6> Loading exercises... </h6>
              <Loader type="TailSpin" color="#00BFFF" height={'10vw'} width={'10vw'} />
            </>
            : <>
              {!userNotice ?
                <>
                  {!workout ?
                    <>
                      {/* no workout is set nor userNotice, we show the questions */}
                      <h4>Progress {currentQuestion.questionScore / (questions.length) * 100}%</h4>
                      <h5>{currentQuestion.questionText}</h5>
                      {currentQuestion.answerOptions.map((option, key) => (
                        <button className='questionAnswer' key={key} onClick={() => onclickHandler(option)}>{option.text}</button>
                      ))}
                    </>
                    :
                    <>
                      {/* workout is set and there is no user notice, show the advice */}
                      <h2>Result</h2>
                      {workout.comment && <h4>{workout.comment}</h4>}
                      <p>You are currently nog logged in, this means your workout will not be saved to your profile. Login anyways and store your workout to your profile?</p>
                      {/* Pushing to the histrory with LocationDescriptorObject for state binding */}
                      <button className='defaultButton' onClick={() => { history.push({ pathname: '/login', state: { workout } }) }}>Login</button>

                      <p><b>Not happy with the result?</b></p>
                      {/** 
                        *history.go() forces a redirect to the last set history value. 
                        *On redirect we also lose the states which we want to start over.
                        **/}
                      <button className='defaultButton' onClick={() => history.go()}>Try again</button>
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
                  {/* userNotice is set, show the message */}
                  <h6 className='errMssg'>{userNotice}</h6>
                </>
              }
            </>
          }
        </div>
      </div>
    </div>
  );
}
