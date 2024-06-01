import React, {useEffect, useState} from "react";
import { useAppContext} from "../../context/Context";
import {useNavigate} from "react-router-dom";

export const SelectPlugins = ({setIsLoading}) => {

    const {osName, systemInfo, file, processlist, setProcessList} = useAppContext();
    const [plugin, setPlugin] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        console.log(osName, systemInfo)
    }, [osName, systemInfo]);

    const fetchProcessList = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!file) return;
        console.log("filepath ", file.path)
        console.log("os ", osName.os)
        console.log("plugin ", plugin)
        try {
            const res = await window.electronAPI.fetchProcessList(file.path, osName.os, plugin);
            console.log(res)
            setProcessList(res.processes)
            console.log("navigate next")

        } catch (error) {
            console.error('Error fetching system info:', error);
        }
        setIsLoading(false);
        navigate("/analysis");
    };


    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setPlugin(value);
            setButtonDisabled(false);
        } else {
            setPlugin("");
            setButtonDisabled(true);
        }
    };

    return (
        <div className="flex flex-col m-auto p-5">
            <div className="grid grid-cols-3 rounded shadow gap-4 bg-themeBlue-darker">
                <div className="p-2">
                    <input type="checkbox" value="pslist" id="pslist-checkbox" onChange={handleCheckboxChange} className="align-middle me-2"/>
                    <label htmlFor="pslist-checkbox" className="text-themeText-light">pslist</label>
                </div>
                <div className="p-2">
                    <input type="checkbox" value="pstree" id="plugin2-checkbox" onChange={handleCheckboxChange} className="align-middle me-2"/>
                    <label htmlFor="plugin2-checkbox" className="text-themeText-light">pstree</label>
                </div>
                <div className="p-2">
                    <input type="checkbox" value="psscan" id="plugin3-checkbox" onChange={handleCheckboxChange} className="align-middle me-2"/>
                    <label htmlFor="plugin3-checkbox" className="text-themeText-light">psscan</label>
                </div>
            </div>
            <div className="flex justify-end mt-5">
                <button className="btn p-2 rounded shadow bg-themeYellow-default hover:bg-themeYellow-light"
                        disabled={buttonDisabled} onClick={fetchProcessList}>Run
                </button>
            </div>
        </div>
    );
};

