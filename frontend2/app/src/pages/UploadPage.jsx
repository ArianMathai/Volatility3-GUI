import React from "react";
import UploadFile from "../components/upload/Upload";
const UploadPage = () => {

    return (
        <main className="flex justify-center">
            <div className="">
                <div className="m-5">

                </div>
                <div className="flex justify-center gap-20">
                    <div className="w-1/3">

                    </div>
                    <div className="w-1/3">

                    </div>
                </div>
                <div className="mt-10 mb-10">
                    <UploadFile/>
                </div>
                <button></button>
            </div>
        </main>
    );
};

export default UploadPage;
