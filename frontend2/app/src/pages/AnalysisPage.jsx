import React, {useContext, useEffect} from "react";
import Logo from "../components/shared/Logo";
import { useAppContext} from "../context/Context";

const AnalysisPage = () => {

    const {osName, systemInfo} = useAppContext();

    useEffect(() => {
        console.log(osName, systemInfo)
    }, [osName, systemInfo]);

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
        </>
    );
};

export default AnalysisPage;
