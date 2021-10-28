import React from 'react';
import { useHistory } from 'react-router-dom';

function Button({ link, text, isDisabled }) {
    const history = useHistory();

    function goTo() {
        history.push('/profile');
    }

    return (
        <button
            onClick={() => goTo(link)}
            disabled={isDisabled ?? false}
        >
            {text}
        </button>
    );
}

export default Button;