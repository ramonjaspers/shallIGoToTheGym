// import useState so we can use react hooks
import { useState } from 'react';

export default function useQuestionState() {
    // basic state set
    const [currentQuestion, setCurrentQuestion] = useState({ questionText: null, questionScore: 0, answerOptions: [] });
    const [comment, setComment] = useState('');
    const [equipment, setEquipment] = useState(null);
    const [workoutType, setWorkoutType] = useState(null);

    // question in array format so we can loop over it
    const questions = [
        {
            questionText: 'Howmany times did you exercise in the last 7 days?',
            questionScore: 0,
            answerOptions: [
                { text: '0-1 times', points: 1, comment: 'Try to do light exercises atleast 2 times a week.' },
                { text: '2-3 times', points: 1 },
                { text: '4-5 times', points: 1 },
                { text: 'more than 5 times', points: 999, comment: 'Take some rest, your body needs rest to heal' },
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
                { text: '5-6 hours', points: 1, comment: 'Try these to get some more sleep tonight.' },
                { text: '6-7 hours', points: 1 },
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
                { text: 'Mentally', points: 1, comment: 'Exercising can help lower mental stress and exhaustion.' },
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
                { text: 'No', points: 1, equipment: 7 },
                { text: 'yes', points: 1 },
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
     * @param {*} answer 
     * @returns {object|void} workout
     */
    const handleAnswer = async (answer) => {
        const nextQuestionScore = currentQuestion.questionScore + answer.points;
        // Set the newest data or keep the old
        const currentComment = answer.comment ?? comment ?? '';
        const currentWorkoutType = answer.workoutType ?? workoutType ?? '';
        const currentEquipment = answer.equipment ?? equipment ?? '';
        // Preserve data
        setComment(currentComment);
        setWorkoutType(currentWorkoutType);
        setEquipment(currentEquipment);
        if (nextQuestionScore > 7) {
            if (nextQuestionScore > 900) {
                return { catagory: 4, equipment: currentEquipment, comment: currentComment };
            } else {
                return { catagory: workoutType, equipment: currentEquipment, comment: currentComment };
            }
        } else {
            const newQuestion = getQuestion(nextQuestionScore);
            setCurrentQuestion(newQuestion);
        }
        // Return empty object with no props since the quiz hasnt finished
        return {};
    }

    // return the props we want to use in external files 
    return {
        currentQuestion,
        questions,
        getQuestion,
        setCurrentQuestion,
        handleAnswer,
    }
};