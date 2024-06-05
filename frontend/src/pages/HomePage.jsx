import { useNavigate } from 'react-router-dom';
import React from 'react';
import InfoBox from '../components/shared/InfoBox';
import InfoVolatility3 from '../components/shared/InfoVolatility3';
import LibraryButton from "../components/shared/LibraryButton";
import HomeButton from "../components/shared/HomeButton";

const HomePage = () => {
    const navigate = useNavigate();

    const startNew = () => {
        navigate('/uploadfile');
    };

    return (
        <main className="flex justify-center">
            <div className="w-full flex flex-col items-center">
                <div className="m-5">
                    <img src="../public/img/v3logo.png" alt="v3logo"/>
                </div>
                <div className="absolute right-0 top-0">
                    <HomeButton/>
                </div>
                <div className="flex justify-center gap-20">
                    <div className="w-1/3">
                        <InfoBox/>
                    </div>
                    <div className="w-1/3">
                        <InfoVolatility3/>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-7 mt-10">
                    <LibraryButton/>
                    <div
                        className="flex flex-col items-center bg-blue-700 rounded-2xl transition duration-300 ease-in-out hover:bg-blue-500 hover:cursor-pointer"
                        style={{width: '150px', height: '120px'}}
                        onClick={startNew}
                    >
                        <img className="w-12 mt-4" src="../public/img/add-file.png" alt="newProjectIcon"/>
                        <p className="text-center mt-2">
                            New Project
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-500 rounded-2xl cursor-not-allowed"
                         style={{width: '150px', height: '120px'}}>
                        <img className="w-12 mt-4" src="../public/img/progression.png" alt="loadProjectIcon"/>
                        <p className="text-center mt-2">Load Project
                            <p className="text-center text-xs">(To be released)</p>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
        ;
};

export default HomePage;