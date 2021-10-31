import React, { useState } from 'react';

export default function useQuestionState() {
    const [question, setQuestion] = useState(0);

    const questions = [
        {
            questionText: 'Howmany times did you exercise in the last 7 days',
            questionScore: 0,
            answerOptions: [
                { answerText: '0 times', points: 1 },
                { answerText: '1-2 times', points: 1 },
                { answerText: '3-4 times', points: 1 },
                { answerText: '5-6 times', points: 1 },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'New York', points: 1 },
                { answerText: 'London', points: 1 },
                { answerText: 'Paris', points: 1 },
                { answerText: 'Dublin', points: 1 },
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
                { answerText: 'New York', points: 1 },
                { answerText: 'London', points: 1 },
                { answerText: 'Paris', points: 1 },
                { answerText: 'Dublin', points: 1 },
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            answerOptions: [
                { answerText: 'New York', points: 1 },
                { answerText: 'London', points: 1 },
                { answerText: 'Paris', points: 1 },
                { answerText: 'Dublin', points: 1 },
            ],
        },
    ];

    const getQuestion = (score) => {
        return questions.filter(question => question.questionScore === score);
    }


    const handleAnswerOptionClick = (points) => {
        const newQuestion = getQuestion(question.questionScore + points);
        setQuestion(newQuestion);
    }

    return {
        question,
        getQuestion,
        handleAnswerOptionClick,
    }
};