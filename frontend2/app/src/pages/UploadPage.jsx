import React, { useState } from 'react';
import { Upload } from '../components/upload/Upload';
import Logo from '../components/shared/Logo';
import InfoBox from '../components/shared/InfoBox';
import InfoVolatility3 from '../components/shared/InfoVolatility3';
import Loader from '../components/Loader';
import PluginLibraryPage from "./PluginLibraryPage";
import LibraryButton from "../components/shared/LibraryButton";

const UploadPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <main className="flex justify-center">
            <div className="">
                <div>
                    <Logo />
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
                    <Upload setIsLoading={setIsLoading} />
                    <Loader isLoading={isLoading} />
                </div>
                <LibraryButton/>
            </div>
        </main>
    );
};

export default UploadPage;
