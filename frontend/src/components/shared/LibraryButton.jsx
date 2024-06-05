import React from 'react';
import { useNavigate } from 'react-router-dom';

const LibraryButton = () => {
    const navigate = useNavigate();

    const goToPluginLibrary = () => {
        navigate('/pluginlibrary');
    };

    return (
        <div onClick={goToPluginLibrary} className="flex flex-col items-center bg-themeYellow-default rounded-2xl transition duration-300 ease-in-out hover:bg-themeYellow-light hover:cursor-pointer" style={{ width: '150px', height: '120px' }}>
            <img className="w-12 mt-4" src={"../public/img/books-stack-of-three.png"} alt="libraryIcon" />
            <p className="text-center mt-2">
                Plugin Library
            </p>
        </div>
    );
};

export default LibraryButton;