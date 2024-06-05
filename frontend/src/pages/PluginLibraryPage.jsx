import React, { useState } from "react";
import Logo from "../components/shared/Logo";
import HomeButton from "../components/shared/HomeButton";
import PluginList from "../components/library/PluginList";

const PluginLibraryPage = () => {
    const [selectedOS, setSelectedOS] = useState('Windows');

    const handleOSTabClick = (os) => {
        setSelectedOS(os);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="relative flex flex-row justify-center items-center p-4 text-white">
                <div className="absolute left-3">
                    <Logo />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Plugin Library</h1>
                </div>
                <div className="absolute right-3 top-1">
                    <HomeButton />
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className={`w-44 p-3 rounded-2xl ${selectedOS === 'MacOs' ? 'bg-darkerblue-important text-lg text-white' : 'bg-darkblue-important text-sm text-gray-400'}`}
                    onClick={() => handleOSTabClick('MacOs')}
                >
                    MacOs
                </button>
                <button
                    className={`w-44 p-3 rounded-2xl ${selectedOS === 'Windows' ? 'bg-darkerblue-important text-lg text-white' : 'bg-darkblue-important text-sm text-gray-400'}`}
                    onClick={() => handleOSTabClick('Windows')}
                >
                    Windows
                </button>
                <button
                    className={`w-44 p-3 rounded-2xl ${selectedOS === 'Linux' ? 'bg-darkerblue-important text-lg text-white' : 'bg-darkblue-important text-sm text-gray-400'}`}
                    onClick={() => handleOSTabClick('Linux')}
                >
                    Linux
                </button>
            </div>
            <div className="p-4 flex-grow flex justify-center overflow-hidden">
                <PluginList selectedOS={selectedOS} />
            </div>
        </div>
    );
};

export default PluginLibraryPage;