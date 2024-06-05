import { useAppContext } from "../../context/Context";
import React, { useState } from "react";
import Loader from "../shared/Loader";
import ProjectInfo from "../shared/ProjectInfo";
import {useNavigate} from "react-router-dom";

const AdditionalPluginBar = () => {
    const { projectName, folderPath, osName, file, plugins, setProcessList, setPlugins, pluginList, searchQuery, setSearchQuery } = useAppContext();
    const [selectedPlugin, setSelectedPlugin] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handlePluginChange = (e) => {
        if (e.target.value === "") return;
        setSelectedPlugin(e.target.value);
        console.log("Handle plugin change: ", e.target.value);
    };

    const fetchUpdatedProcessList = async () => {
        setIsLoading(true);
        if (!selectedPlugin) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await window.electronAPI.fetchProcessList(file.path, osName.os, selectedPlugin);
            if (res?.processes) {
                const newProcessList = { plugin: selectedPlugin, processes: res.processes };
                console.log("Updated processList: ", newProcessList);

                setProcessList((prev) => [...prev, newProcessList]);

                setPlugins((prevList) => {
                    if (!prevList.includes(selectedPlugin)) {
                        return [...prevList, selectedPlugin];
                    }
                    return prevList;
                });

                navigate(`analysis/${selectedPlugin}`)
            } else {
                console.error(`Error fetching process list for ${selectedPlugin}`);
            }
        } catch (error) {
            console.error(`Error fetching process list for ${selectedPlugin}:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="gap-3 flex-col p-3">
            <ProjectInfo/>
            <div className="flex flex-row gap-8 mt-3 mb-3 w-full">
                <div className="w-2/3 flex flex-row">
                <select
                        className="rounded p-1 shadow"
                        value={selectedPlugin}
                        onChange={handlePluginChange}
                    >
                        <option value="" disabled selected>Add another plugin</option>
                        {pluginList.map((plugin, i) => (
                            <option key={i} value={plugin.name}>{plugin.name}</option>
                        ))}
                    </select>
                    <button onClick={fetchUpdatedProcessList}
                            className="p-1 ms-3 w-32 bg-themeYellow-default shadow rounded">
                        Run
                    </button>
                    <div className="relative ml-8">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader isLoading={isLoading}/>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 relative">
                    <img src="../public/img/search-icon.png"
                         className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" alt="search icon"/>
                    <input
                        type="text"
                        placeholder="Search report..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-1 pl-8 border rounded w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default AdditionalPluginBar;