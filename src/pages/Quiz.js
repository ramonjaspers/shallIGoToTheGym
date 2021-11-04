import React, { useEffect } from 'react';
import useQuestionState from '../helpers/QuestionState';
import useWorkoutState from '../helpers/WorkoutState';
import Exercise from '../components/Exercise';
import { useHistory } from 'react-router';
// style import
import '../assets/styles/Auth.css';

export default function Quiz() {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    clearQuestionData,
    getQuestion,
    handleAnswerOptionClick
  } = useQuestionState();
  const { workout, clearWorkoutData } = useWorkoutState();
  const history = useHistory();

  useEffect(() => {
    if (!currentQuestion.answerOptions.length > 0) {
      const initialQuestion = getQuestion(0);
      setCurrentQuestion(initialQuestion);
    }
  }, []);

  const tryAgain = () => {
    clearWorkoutData();
    clearQuestionData();
    history.push('/quiz');
  }
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
                {console.log(currentQuestion)}
                {currentQuestion.answerOptions.map((option, key) => (
                  <button key={key} onClick={() => handleAnswerOptionClick(option)}>{option.text}</button>
                ))}
              </div>
            </>
            : <>
              <h2>Result</h2>
              {workout.comment && <div className='question-text'>{workout.comment}</div>}
              <p>Not happy with the result?</p>
              <button onClick={() => tryAgain()}>Try again</button>
              {workout.exercises.length > 0 &&
                workout.exercises.map(exercise =>
                  <Exercise key={exercise.id} exercise={exercise} />
                )
              }

            </>
          }
        </>
      </div>
    </div>
  );
}

