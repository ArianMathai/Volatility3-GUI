import React from "react";
import { useAppContext } from "../../context/Context";

const SystemInfo = () => {
    const { osName, systemInfo } = useAppContext();

    return (
        <div className="p-3 bg-gray-200 rounded-md shadow-md text-themeText-light bg-themeBlue-darker">
            <h4 className="text-lg font-bold mb-2">System Information</h4>
            <div className="text-left text-xs mt-2">
                <p className="mb-2 ml-1 text-l">
                    <span className="font-bold text-l">OS:</span> {osName}
                </p>
                <ul>
                    {systemInfo.map((item, index) => (
                        <li
                            key={index}
                            className={`p-1 ${index % 2 === 0 ? "bg-darkblue-important" : "bg-darkerblue-important"} rounded-lg break-words mb-1`}
                        >
                            <p>
                                <span className="font-bold">{item.Variable}:</span> <span className="font-normal">{item.Value}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SystemInfo;