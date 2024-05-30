import React, {useEffect, useState} from "react";
import Logo from "../components/shared/Logo";
import { useAppContext} from "../context/Context";
import {useNavigate} from "react-router-dom";

export const SelectPlugins = () => {

    const {osName, systemInfo, file, pslist, setPslist} = useAppContext();
    const [plugin, setPlugin] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        console.log(osName, systemInfo)
    }, [osName, systemInfo]);

    const fetchProcessList = async (e) => {
        e.preventDefault();
        if (!file) return;
        console.log("filepath ", file.path)
        console.log("os ", osName.os)
        console.log("plugin ", plugin)
        try {
            const res = await window.electronAPI.fetchProcessList(file.path, osName.os, plugin);
            console.log(res)
            setPslist(res.processes)
            console.log("navigate next")

        } catch (error) {
            console.error('Error fetching system info:', error);
        }
        navigate("/analysis");
    };


    function toggleButton() {
        setButtonDisabled(prev => !prev)

    }

    useEffect(() => {
        if (buttonDisabled) {
            setPlugin("")
        } else {
            setPlugin("pslist")
        }
        console.log(plugin)
        console.log(osName)
        console.log(osName.os)
    }, [buttonDisabled]);

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
            <div className="pslist-container">
                <label for="pslist-checkbox">pslist:</label>
                <input type="checkbox" className="pslist-checkbox" onClick={toggleButton}/>
                <button className="run-button" disabled={buttonDisabled} onClick={fetchProcessList}>Run</button>
            </div>
        </>
    );
};

