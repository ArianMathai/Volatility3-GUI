import React, {useEffect, useState} from "react";
import Logo from "../components/shared/Logo";
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
            <h1>Analysis page</h1>
            <div>
                <Logo/>
            </div>
            <h2>{osName.os}</h2>
            <ul>
                {systemInfo.processes && systemInfo.processes.map((item, index) => (
                    <li key={index}>
                        <strong>{item.Value}:</strong> {item.Variable}
                    </li>
                ))}
            </ul>
            <ul>
                {report?.map((item, index) => (
                    <li key={index}>
                        {Object.entries(item).map(([key, value]) => (
                            <div key={key}>
                                <strong>{key}:</strong> {value}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
            <button onClick={fetchPluginReport}>Click to fetch pslist</button>
        </>
    );
};

export default AnalysisPage;
