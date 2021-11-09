import React from 'react';
import { useHistory } from 'react-router-dom';

import '../assets/styles/Button.css'
export default function Button({ link, text, isDisabled }) {
    const history = useHistory();

    /**
     * navigates to the given link
     * @returns {void}
     */
    const navigateTo = () => history.push(`/${link}`);

    return (
        <button
            className='customButton'
            onClick={() => navigateTo(link)}
            disabled={isDisabled ?? false}
        >
            {text}
        </button>
    );
}
