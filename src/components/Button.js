import React from 'react';
import { useHistory } from 'react-router-dom';

import '../assets/styles/Button.css'
export default function Button({ link, text, isDisabled }) {
    const history = useHistory();

    const navigateTo = () => {
        history.push(`/${link}`);
    }

    return (
        <button
            class='customButton'
            onClick={() => navigateTo(link)}
            disabled={isDisabled ?? false}
        >
            {text}
        </button>
    );
}
