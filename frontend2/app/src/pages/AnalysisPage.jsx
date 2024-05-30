import React, {useEffect} from "react";
import {Analysis} from "../components/Analysis";
import { useAppContext} from "../context/Context";

const AnalysisPage = () => {

    const {osName, systemInfo} = useAppContext();

    useEffect(() => {
        console.log(osName, systemInfo)
    }, [osName, systemInfo]);

    return (
        <>
            <Analysis />
        </>
    );
};

export default AnalysisPage;
