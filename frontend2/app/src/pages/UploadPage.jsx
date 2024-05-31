import React from "react";
import {Upload} from "../components/Upload";
import Logo from "../components/shared/Logo";
import InfoBox from "../components/shared/InfoBox";
import InfoVolatility3 from "../components/shared/InfoVolatility3";


const UploadPage = () => {

    return (
        <main className="flex justify-center">
            <div className="">
                <div className="m-5">
                    <Logo/>
                </div>
                <div className="flex justify-center gap-20">
                    <div className="w-1/3">
                        <InfoBox/>
                    </div>
                    <div className="w-1/3">
                        <InfoVolatility3/>
                    </div>
                </div>
                <div className="mt-10 mb-10">
                    <Upload/>
                </div>
            </div>
        </main>
    );
};

export default UploadPage;
