import React from "react";
import { useAppContext } from "../../context/Context";

const SystemInfo = () => {
    const { osName, systemInfo } = useAppContext();

    // List of desired keys
    const desiredKeys = [
        "Is64Bit",
        "NTBuildLab",
        "MachineType",
        "KeNumberProcessors",
        "SystemTime",
        "NtSystemRoot",
        "NtProductType",
        "NtMajorVersion",
        "NtMinorVersion"
    ];

    // Filter the systemInfo array to only include desired keys
    const filteredSystemInfo = systemInfo.filter(item => desiredKeys.includes(item.Variable));

    return (
        <div className="p-3 bg-gray-200 rounded-md shadow-md text-themeText-light bg-themeBlue-darker mt-20">
            <h4 className="text-lg font-bold mb-2">System Information</h4>
            <div className="text-left text-xs">
                <p className={`mb-2 text-l p-1 bg-darkerblue-important rounded-lg break-words`}>
                    <span className="font-bold text-l">OS:</span> {osName}
                </p>
                <ul>
                    {filteredSystemInfo.map((item, index) => (
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