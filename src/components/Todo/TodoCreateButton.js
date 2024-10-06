import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/TodoCreateButton.css';

export default function TodoCreateButton({ onOpen }) {
    const [buttonText, setButtonText] = useState('New Todo Item +');

    useEffect(() => {
        const handleResize = () => {
            if (window.outerWidth <= 800) {
                setButtonText('+');
            } else {
                setButtonText('New Todo Item +');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial state

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    TodoCreateButton.propTypes = {
        onOpen: PropTypes.func.isRequired
    };

    return (
        <button className="todo-create-button" onClick={onOpen}>
            {buttonText}
        </button>
    );
}