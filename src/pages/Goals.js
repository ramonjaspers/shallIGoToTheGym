// Import react module and components
import React from 'react';
import { useParams } from "react-router-dom";
import '../assets/styles/Goals.css';
// Import components
import Goal from '../components/Goal';
import Advice from '../components/Advice';

export default function Goals() {
    const { goal } = useParams();
    return (
        <>
            {!goal ?
                <div id="goal-row">
                    <Goal goal='weightloss' />
                    <Goal goal='musclegain' />
                    <Goal goal='maintenance' />
                </div>
                :
                <Advice goal={goal} />
            }
        </>
    )
}




