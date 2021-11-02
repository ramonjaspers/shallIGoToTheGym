import React from 'react';
import useQuestionState from '../helpers/QuestionState';

// style import
import '../assets/styles/Auth.css';

export default function Quiz() {
  const { question, handleAnswerOptionClick, getQuestion } = useQuestionState();

  return (
    <div class='wrapper'>
      <div class='container'>
        <>
          <div className='question-section'>
            <div className='question-count'>
              {/* <span>Question {question. + 1}</span>/{questions.length} */}
            </div>
            <div className='question-text'>{question.questionText}</div>
          </div>
          <div className='answer-section'>
            {/* {questions[currentQuestion].answerOptions.map((answerOption) => ( */}
              {/* <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button> */}
            {/* ))} */}
          </div>
        </>
      </div>
    </div>
  );
}

