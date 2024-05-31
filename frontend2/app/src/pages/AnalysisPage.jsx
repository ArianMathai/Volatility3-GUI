import React, {useEffect} from "react";
import {Analysis} from "../components/Analysis";

import { useAppContext} from "../context/Context";

const AnalysisPage = () => {

    const {osName, systemInfo, filePath} = useAppContext();
    const [report, setReport] = useState()

    const fetchPluginReport = async () => {

        console.log(osName);
        console.log(filePath);

        if (!osName || !filePath) return;
        try {
            const res = await window.electronAPI.fetchPluginInfo(filePath.path, osName.os,"pslist");
            console.log(res)

            setReport(res.processes);

        } catch (error) {
            console.error('Error fetching system info:', error);
        }

    };

    useEffect(() => {
        console.log("OS",osName);
        console.log("FilePath", filePath);
    }, [osName,filePath]);

    useEffect(() => {
        console.log(report)
    }, [report]);

    return (
        <>
            <Analysis />
        </>
    );
};

export default AnalysisPage;
