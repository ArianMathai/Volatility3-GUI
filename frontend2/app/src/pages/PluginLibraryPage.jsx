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
        <>
            <div className="flex flex-row justify-between items-center p-4 bg-gray-800 text-white">
                <div>
                    <Logo />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Plugin Library</h1>
                </div>
                <div>
                    <HomeButton/>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className={`px-6 py-2 mx-1 font-medium rounded-t-lg ${selectedOS === 'Windows' ? 'bg-gray-300 text-gray-800' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => handleOSTabClick('Windows')}
                >
                    Windows
                </button>
                <button
                    className={`px-6 py-2 mx-1 font-medium rounded-t-lg ${selectedOS === 'Mac' ? 'bg-gray-300 text-gray-800' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => handleOSTabClick('Mac')}
                >
                    Mac
                </button>
                <button
                    className={`px-6 py-2 mx-1 font-medium rounded-t-lg ${selectedOS === 'Linux' ? 'bg-gray-300 text-gray-800' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => handleOSTabClick('Linux')}
                >
                    Linux
                </button>
            </div>
            <div className="p-4">
                <PluginList selectedOS={selectedOS} />
            </div>
        </>
    );
};

export default PluginLibraryPage;
