import { useNavigate } from 'react-router-dom';
import React from 'react';
import InfoBox from '../components/shared/InfoBox';
import InfoVolatility3 from '../components/shared/InfoVolatility3';
import LibraryButton from "../components/shared/LibraryButton";

const HomePage = () => {
    const navigate = useNavigate();

    const startNew = () => {
        navigate('/uploadfile');
    };

    return (
        <>
            <div className="flex justify-center my-5">
                <img src="../public/img/v3logo.png" alt="v3logo" className="h-20" />
            </div>
            <main className="flex justify-center">
                <div className="w-full flex flex-col items-center">
                    <div className="flex justify-center gap-20 mb-10">
                        <div className="w-1/3">
                            <InfoBox />
                        </div>
                        <div className="w-1/3">
                            <InfoVolatility3 />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-7">
                        <LibraryButton />
                        <div
                            className="flex flex-col items-center bg-blue-500 rounded-2xl transition duration-300 ease-in-out hover:bg-blue-700"
                            style={{ width: '150px', height: '120px' }}
                            onClick={startNew}
                        >
                            <img className="w-16 p-2" src="../public/img/add-file.png" alt="newProjectIcon" />
                            <button className="py-2 px-4">
                                New Project
                            </button>
                        </div>
                        <div className="flex flex-col items-center bg-gray-500 rounded-2xl cursor-not-allowed" style={{ width: '150px', height: '120px' }}>
                            <img className="w-16 p-2" src="../public/img/progression.png" alt="loadProjectIcon" />
                            <button className="text py-2 px-4" disabled>
                                Load Project
                                <p className="text-xs">(To be released)</p>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;