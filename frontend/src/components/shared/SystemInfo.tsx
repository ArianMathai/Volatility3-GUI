import React, {useContext, useEffect} from "react";
import {Context} from "../../context/Context";

const SystemInfo = () => {

    const {osName, systemInfo} = useContext(Context);

    useEffect(() => {
        console.log(systemInfo?.processes)
        console.log(systemInfo)
    }, [systemInfo]);

    return osName && systemInfo && systemInfo.processes ? (
        <div>
            <h4>Systeminfo:</h4>
            <p>{osName}</p>
            <ul>
                {systemInfo?.processes.map((item, index) => (
                    <li key={index}>
                        <strong>{item.Variable}:</strong> {item.Value}
                    </li>
                ))}
            </ul>


        </div>
    ) : <p>No system info available</p>
}

export default SystemInfo;