import React, {useEffect} from "react";
import {useAppContext} from "../../context/Context";

const SystemInfo = () => {
    const {osName, systemInfo} = useAppContext();
    useEffect(() => {
        console.log(osName, systemInfo)
    }, [osName, systemInfo]);

    return (
        <div>
            <h2>{osName.os}</h2>
            <ul>
                {systemInfo.processes && systemInfo.processes.map((item, index) => (
                    <li key={index}>
                        <strong>{item.Value}:</strong> {item.Variable}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SystemInfo;