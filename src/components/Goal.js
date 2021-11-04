import React from 'react';
import { Link } from 'react-router-dom';

export default function Goal({ goal }) {
    return (
        <Link to={`goals/${goal}`}>
            <div className={`column ${goal}`}>
                <h2 className='centerText'>{goal}</h2>
            </div>
        </Link>
    );
}

