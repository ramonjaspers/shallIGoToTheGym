import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/Button.css'
export default function Button({ link, text, isDisabled }) {
    const navigate = useNavigate();

    /**
     * navigates to the given link
     * @returns {void}
     */
    const navigateTo = () => navigate(`/${link}`);

    return (
        <button
            className='custom-button'
            onClick={() => navigateTo(link)}
            disabled={isDisabled ?? false}
        >
            {text}
        </button>
    );
}
