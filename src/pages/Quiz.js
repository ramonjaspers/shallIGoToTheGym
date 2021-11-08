// imports
// modules/dependencies
import React, { useEffect, useState, useContext } from 'react';
import useQuestionState from '../helpers/QuestionState';
import useWorkoutState from '../helpers/WorkoutHelper';
import Exercise from '../components/Exercise';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';
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
    clearQuestionData,
    getQuestion,
    handleAnswer
  } = useQuestionState();
  const { generateWorkoutAdvice } = useWorkoutState();
  const { user } = useContext(AuthContext);
  const [workout, setWorkout] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const history = useHistory();


  useEffect(() => {
    if (!currentQuestion.answerOptions.length > 0) {
      const initialQuestion = getQuestion(currentQuestion.questionScore);
      setCurrentQuestion(initialQuestion);
    }
  }, [workout]);


  /**
   * 
   * @param {{comment, workout}} data 
   */
  const storeWorkout = (advice) => {
    if (user && user.id) {
      // set the workout in the localStorage for user usage
      const storedWorkout = localStorage.getItem('workout' + user.id);
      if (storedWorkout) {
        localStorage.removeItem('workout' + user.id);
      }
      localStorage.setItem('workout' + user.id, { 'workout': advice.workout, 'comment': advice.comment });
    }
    setWorkout({ 'exercises': advice.workout, 'comment': advice.comment });
    setIsProcessing(false);
  }

  const onclickHandler = async (userInput) => {
    // Handle the user input
    const result = await handleAnswer(userInput);
    if (result.catagory !== undefined
      && result.equipment !== undefined
      && result.comment !== undefined
    ) {
      setIsProcessing(true);
      // If we recieved an object with the props needed fetch workout advice
      console.log(result.equipment);
      const advice = await generateWorkoutAdvice(result.catagory, result.equipment, result.comment);
      storeWorkout(advice);
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
              {!workout ?
                <>
                  <h4>Progress {currentQuestion.questionScore / (questions.length) * 100}%</h4>
                  <h5>{currentQuestion.questionText}</h5>
                  {currentQuestion.answerOptions.map((option, key) => (
                    <button className='questionAnswer' key={key} onClick={() => onclickHandler(option)}>{option.text}</button>
                  ))}
                </>
                :
                <>
                  <h2>Result</h2>
                  {workout.comment && <h4>{workout.comment}</h4>}
                  <p>Not happy with the result?</p>
                  {/** 
               *history.go() foreces a refresh on the last set history value. 
               *On refresh we also lose the states which we want to start over.
               **/}
                  <button onClick={() => history.go()}>Try again</button>
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
          }
        </div>
      </div>
    </div>
  );
}
