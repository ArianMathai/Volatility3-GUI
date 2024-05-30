import React from "react";
import Logo from "../components/shared/Logo";
import SystemInfo from "../components/shared/SystemInfo";
import ProcessList from "../components/analysis/ProcessList";

const AnalysisPage = () => {

    return (
        <>
            <h1>Analysis page</h1>
            <div>
                <Logo/>
            </div>
            <SystemInfo/>
            <ProcessList/>
        </>
    );
};

export default AnalysisPage;
