import React, { useState, useContext, useEffect } from 'react';
import { Upload } from '../components/upload/Upload';
import InfoBox from '../components/shared/InfoBox';
import InfoVolatility3 from '../components/shared/InfoVolatility3';
import Loader from '../components/shared/Loader';
import LibraryButton from "../components/shared/LibraryButton";
import {useAppContext} from '../context/Context';
import HomeButton from "../components/shared/HomeButton";


const UploadPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setStep1Completed, setStep2Completed,error } = useAppContext();

    useEffect(() => {
        // Mark step 1 as completed when the user navigates to the upload page
        setStep1Completed(true);
    }, [setStep1Completed]);

    const handleFileUpload = (file) => {
        if (file) {
            setStep2Completed(true);
        }
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
                        <InfoBox />
                    </div>
                    <div className="w-1/3">
                        <InfoVolatility3 />
                    </div>
                </div>
                <div className="mt-10 mb-10 flex flex-col items-center gap-3">
                    <Upload setIsLoading={setIsLoading} onFileUpload={handleFileUpload} />
                     {error && <span className="text-themeText-light">{error}</span>}
                    <Loader isLoading={isLoading} />
                </div>
            </div>
        </main>
    );
};

export default UploadPage;