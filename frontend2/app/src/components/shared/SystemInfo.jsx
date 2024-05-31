import React from "react";
import {useAppContext} from "../../context/Context";

const SystemInfo = () => {

    const {osName, systemInfo} = useAppContext();

    const filteredProcesses = systemInfo.processes.filter(item =>
        ["Kernel", "Is64Bit", "SystemTime", "NtSystemRoot", "NtMajorVersion", "NtMinorVersion", "CurrentLoggedUser"].includes(item.Variable)
    );

    return (
        <div className="w-40 p-3 ms-5 bg-gray-200 rounded-md shadow-md text-themeText-light bg-themeBlue-darker">
            <h4>Systeminfo</h4>
            <div className="text-left text-xs">
                <p><strong>OS:</strong> {osName.os}</p>
                <ul>
                    {filteredProcesses.map((item, index) => (
                        <li key={index} className="break-words whitespace-normal">
                            <p><strong>{item.Variable}:</strong> {item.Value}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SystemInfo;