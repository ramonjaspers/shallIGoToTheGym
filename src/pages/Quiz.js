import React, { useEffect, useState, useContext } from 'react';
import useQuestionState from '../helpers/QuestionState';
import useWorkoutState from '../helpers/WorkoutHelper';
import Exercise from '../components/Exercise';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';
// style import
import '../assets/styles/Auth.css';

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
  const [workout, setWorkout] = useState([]);
  const history = useHistory();


  useEffect(() => {
    if (!currentQuestion.answerOptions.length > 0) {
      const initialQuestion = getQuestion(currentQuestion.questionScore);
      setCurrentQuestion(initialQuestion);
    }
  }, [workout]);


  const tryAgain = () => {
    setWorkout([]);
    clearQuestionData();
    history.push('/quiz');
  }

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
      localStorage.setItem('workout' + user.id, { 'workout': workout, 'comment': advice.comment });
    }
    setWorkout([{ 'exercises': workout, 'comment': advice.comment }]);
  }

  const onclickHandler = async (userInput) => {
    // Handle the user input
    const result = await handleAnswer(userInput);
    if (result.catagory !== undefined
      && result.equipment !== undefined
      && result.comment !== undefined
    ) {
      // If we recieved an object with the props needed fetch workout advice
      const advice = await generateWorkoutAdvice(result.catagory, result.equipment, result.comment);
      storeWorkout(advice);
    }
  };

  console.log(workout);

  return (
    <div className='wrapper'>
      <div className='container'>
        <>
          {!workout.length > 0 ?
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Progress {currentQuestion.questionScore / (questions.length) * 100}% </span>
                </div>
                <div className='question-text'>{currentQuestion.questionText}</div>
              </div>
              <div className='answer-section'>
                {currentQuestion.answerOptions.map((option, key) => (
                  <button key={key} onClick={() => onclickHandler(option)}>{option.text}</button>
                ))}
              </div>
            </>
            : <>
              <h2>Result</h2>
              {workout.comment && <div className='question-text'>{workout.comment}</div>}
              <p>Not happy with the result?</p>
              <button onClick={() => tryAgain()}>Try again</button>
              {workout.exercises.length > 0 &&
                <>
                  <h3>Your workout for today</h3>
                  {workout.exercises.map(exercise =>
                    <Exercise key={exercise.id} exercise={exercise} />
                  )}
                </>
              }
            </>
          }
        </>
      </div>
    </div>
  );
}
