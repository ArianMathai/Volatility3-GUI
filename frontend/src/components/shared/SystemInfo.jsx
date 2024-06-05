import React from "react";
import {useAppContext} from "../../context/Context";

const SystemInfo = () => {

    const {osName, systemInfo} = useAppContext();

    return (
        <div className="p-3 mb-5 bg-gray-200 rounded-md shadow-md text-themeText-light bg-themeBlue-darker">
            <h4>Systeminfo</h4>
            <div className="text-left text-xs mt-2">
                <p><strong>OS:</strong> {osName}</p>
                <ul>
                    {systemInfo.map((item, index) => (
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