import React from "react";
import {AnalysisLayout} from "../components/analysis/AnalysisLayout";
import Logo from "../components/shared/Logo";
import HomeButton from "../components/shared/HomeButton";
import LeftPanel from "../components/analysis/LeftPanel";

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
            <div className="flex flex-row">
                <LeftPanel/>
                <AnalysisLayout />
            </div>
        </>
    );
};

export default AnalysisLayoutPage;
