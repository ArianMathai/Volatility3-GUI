import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export const SelectPlugins = ({ setIsLoading }) => {
    const { osName, file, setProcessList, setPlugins,plugins } = useAppContext();
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(osName);
    }, [osName]);

    const fetchProcessLists = async () => {
        setIsLoading(true);
        if (!file && !plugins) return;
        const processList = [];
        for (const plugin of plugins) {
            try {
                const res = await window.electronAPI.fetchProcessList(file.path, osName.os, plugin);
                processList.push({ plugin, processes: res.processes });
            } catch (error) {
                console.error(`Error fetching process list for ${plugin}:`, error);
            }
        }
        setProcessList(processList);
        setIsLoading(false);
        navigate(`/analysis/${plugins[0]}`);
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setPlugins(prevPlugins => [...prevPlugins, value]);
            setButtonDisabled(false);
        } else {
            setPlugins(prevPlugins => prevPlugins.filter(plugin => plugin !== value));
            setButtonDisabled(true);
        }
        console.log(plugins)
    };

    return (
        <div className="flex flex-col m-auto p-5">
            <div className="grid grid-cols-3 rounded shadow gap-4 bg-themeBlue-darker">
                <div className="p-2">
                    <input type="checkbox" value="pslist" id="pslist-checkbox" onChange={handleCheckboxChange} className="align-middle me-2" />
                    <label htmlFor="pslist-checkbox" className="text-themeText-light">pslist</label>
                </div>
                <div className="p-2">
                    <input type="checkbox" value="pstree" id="plugin2-checkbox" onChange={handleCheckboxChange} className="align-middle me-2" />
                    <label htmlFor="plugin2-checkbox" className="text-themeText-light">pstree</label>
                </div>
                <div className="p-2">
                    <input type="checkbox" value="psscan" id="plugin3-checkbox" onChange={handleCheckboxChange} className="align-middle me-2" />
                    <label htmlFor="plugin3-checkbox" className="text-themeText-light">psscan</label>
                </div>
            </div>
            <div className="flex justify-end mt-5">
                <button className="btn p-2 rounded shadow bg-themeYellow-default hover:bg-themeYellow-light"
                    disabled={buttonDisabled} onClick={fetchProcessLists}>Run
                </button>
            </div>
        </div>
    );
};
