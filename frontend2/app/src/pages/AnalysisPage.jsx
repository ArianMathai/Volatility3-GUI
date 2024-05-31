import React from "react";
import {Analysis} from "../components/analysis/Analysis";
import Logo from "../components/shared/Logo";
import HomeButton from "../components/shared/HomeButton";

const AnalysisPage = () => {

    return (
        <>
            <div className="flex flex-row justify-between">
                <div>
                    <Logo/>
                </div>
                <div>
                    <HomeButton/>
                </div>
            </div>
            <Analysis />
        </>
    );
};

export default AnalysisPage;
