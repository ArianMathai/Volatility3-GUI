import React from 'react';
import { useNavigate } from 'react-router-dom';

const LibraryButton = () => {
    const navigate = useNavigate();

    const goToPluginLibrary = () => {
        navigate('/pluginlibrary');
    };

    return (
        <button
            onClick={goToPluginLibrary}
            className="btn p-2 rounded shadow bg-themeYellow-default hover:bg-themeYellow-light"
        >
            Go to Plugin Library
        </button>
    );
};

export default LibraryButton;
