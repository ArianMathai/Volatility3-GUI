import React from 'react';
import { useNavigate } from 'react-router-dom';

const LibraryButton = () => {
    const navigate = useNavigate();

    const goToPluginLibrary = () => {
        navigate('/pluginlibrary');
    };

    return (
        <div className="flex flex-col items-center bg-themeYellow-default rounded-2xl transition duration-300 ease-in-out hover:bg-themeYellow-light" style={{ width: '150px', height: '120px' }}>
            <img className="w-16 p-2" src={"../public/img/books-stack-of-three.png"} alt="libraryIcon" />
            <button
                onClick={goToPluginLibrary}
                className="py-2 px-4"
            >
                Go to Plugin Library
            </button>
        </div>
    );
};

export default LibraryButton;