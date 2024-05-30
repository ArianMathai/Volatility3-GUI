import React, {useContext, useEffect} from "react";
import Logo from "../components/shared/Logo";
import {Context} from "../context/Context";

const AnalysisPage = () => {

    const {osName, systemInfo} = useContext(Context);

    useEffect(() => {
        console.log(osName, systemInfo)
    }, [osName, systemInfo]);

    return (
        <>
            <h1>Analysis page</h1>
            <div>
                <Logo/>
            </div>
        </>
    );
};

export default AnalysisPage;
