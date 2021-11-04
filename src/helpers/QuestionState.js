import { useState } from 'react';
import useWorkoutState from './WorkoutState';
export default function useQuestionState() {
    const { generateWorkoutAdvice } = useWorkoutState();
    const [currentQuestion, setCurrentQuestion] = useState({ questionText: null, questionScore: null, answerOptions: [] });
    const [comment, setComment] = useState('');
    const [equipment, setEquipment] = useState(null);
    const [workoutType, setWorkoutType] = useState(null);

    const questions = [
        {
            questionText: 'Howmany times did you exercise in the last 7 days?',
            questionScore: 0,
            answerOptions: [
                { text: '0 times', points: 1, comment: 'Try to do light exercises atleast 2 times a week.' },
                { text: '1-2 times', points: 1 },
                { text: '3-4 times', points: 1 },
                { text: '5-6 times', points: 999, comment: 'Take some rest, your body needs rest to heal' },
            ],
        },
        {
            questionText: 'Did you work today?',
            questionScore: 1,
            answerOptions: [
                { text: 'no', points: 2 },
                { text: 'heavy-work', points: 1 },
                { text: 'light-work', points: 2 },
                { text: 'Sedentary work', points: 2 },
            ],
        },
        {
            questionText: 'How much sleep did you get last night?',
            questionScore: 2,
            answerOptions: [
                { text: '<4 hours', points: 999, comment: 'Get some more rest.' },
                { text: '5-6 hours', points: 1, comment: 'Try to get some more sleep next tonight.' },
                { text: '6-7', points: 1 },
                { text: '>8 hours', points: 1 },
            ],
        },
        {
            questionText: 'What is the reason you wouldnt go to the gym',
            questionScore: 3,
            answerOptions: [
                { text: 'Injured', points: 1 },
                { text: 'Lazy', points: 3 },
                { text: 'Tired', points: 3 },
                { text: 'Exhausted', points: 2 },

            ],
        },
        {
            questionText: 'Where is your injury locaties',
            questionScore: 4,
            answerOptions: [
                { text: 'Upper body', points: 3, workoutType: 2, comment: 'Take it easy, dont go too hard' },
                { text: 'Lower body', points: 3, workoutType: 3, comment: 'Take it easy, dont go too hard' },
                { text: 'core/internally/sick', points: 999, comment: 'Take some rest, get better soon!' },
                { text: 'There are none', points: 2 },

            ],
        },
        {
            questionText: 'What type of exhausted are you',
            questionScore: 5,
            answerOptions: [
                { text: 'Mentally', points: 1, comment: 'Exercising can help lower mental stress/exhaustion.' },
                { text: 'Physically', points: 999, comment: 'Take some rest, consider taking a walk outside.' },

            ],
        },
        {
            questionText: 'Do you have an exercise preference?',
            questionScore: 6,
            answerOptions: [
                { text: 'Cardio', points: 1, workoutType: 1 },
                { text: 'Lower body workout', points: 1, workoutType: 2 },
                { text: 'upper body workout', points: 1, workoutType: 3 },
                { text: 'none', points: 1 },
            ],
        },
        {
            questionText: 'Do you have a gym membership?',
            questionScore: 7,
            answerOptions: [
                { text: 'No', points: 1 },
                { text: 'yes', points: 1, equipment: 7 },
            ],
        },
    ];

    /**
     * Fetches a question from the question JSON list based on questionScore
     * @param {int} questionScore 
     * @returns {question}
     */
    const getQuestion = (questionScore) => questions.filter(question => question.questionScore === questionScore).pop();

    /**
     * Sets possble states and set the next question based on the given answer
     * @param {answerOption} 
     */
    const handleAnswerOptionClick = (answer) => {
        if (answer.comment) {
            setComment(answer.comment);
        }
        if (answer.workoutType) {
            setWorkoutType(answer.workoutType);
        }
        if (answer.equipment) {
            setEquipment(answer.equipment);
        }
        const nextQuestionScore = currentQuestion.questionScore + answer.points;
        if (nextQuestionScore > 7) {
            if (nextQuestionScore > 900) {
                generateWorkoutAdvice(4, equipment, comment);
            } else {
                generateWorkoutAdvice(workoutType, equipment, comment);
            }
        } else {
            const newQuestion = getQuestion(nextQuestionScore);
            setCurrentQuestion(newQuestion);
        }
    }

    /**
     * Call to clear the question data since we do not want to alter the state out of this stateHandler
     */
    const clearQuestionData = () => {
        setComment('');
        setEquipment(null);
        setWorkoutType(null);
    }
    // return the props we want to use in external files 
    return {
        currentQuestion,
        questions,
        getQuestion,
        setCurrentQuestion,
        clearQuestionData,
        handleAnswerOptionClick,
    }
};