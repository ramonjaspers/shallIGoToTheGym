import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Component for showing the goals
 * @param {string} user chosen goal
 * @returns 
 */
export default function Goal({ goal }) {
    return (
        <div className='columnWrapper'>
            <Link to={`goals/${goal}`} className={`column ${goal}`}>
                <h2 className='centerText'>{goal}</h2>
            </Link>
        </div>
    );
}

