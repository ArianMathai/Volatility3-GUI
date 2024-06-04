import React from "react";
import {AnalysisLayout} from "../components/analysis/AnalysisLayout";
import Logo from "../components/shared/Logo";
import HomeButton from "../components/shared/HomeButton";
import AdditionalPluginBar from "../components/analysis/AdditionalPluginBar";

const AnalysisLayoutPage = () => {

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
            <AdditionalPluginBar/>
            <AnalysisLayout />
        </>
    );
};

export default AnalysisLayoutPage;
