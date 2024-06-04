import { useAppContext } from "../../context/Context";
import React, { useState } from "react";

const AdditionalPluginBar = () => {
    const { projectName, folderPath, osName, file, plugins, setProcessList, setPlugins,pluginList, searchQuery, setSearchQuery } = useAppContext();
    //const [selectedAdditionalPlugin, setSelectedAdditionalPlugin] = useState("");
    const [selectedPlugin, setSelectedPlugin] = useState("")

    const handlePluginChange = (e) => {
        if(e.target.value === "") return;
        setSelectedPlugin(e.target.value);
        console.log("Handle plugin change: ", e.target.value);
    };

    const fetchUpdatedProcessList = async () => {
        if (!selectedPlugin) return;

        setPlugins((prevList) => {
            if (!prevList.includes(selectedPlugin)) {
                return [...prevList, selectedPlugin];
            }
            return prevList;
        });
        console.log("Pugins:", plugins);
        console.log("Selected plugin:", selectedPlugin);


        try {
            const res = await window.electronAPI.fetchProcessList(file.path,osName.os,selectedPlugin);
            const newProcessList = { plugin:selectedPlugin, processes: res.processes };
            console.log("Updated processList: ", newProcessList);

            setProcessList((prev) => [...prev, newProcessList]);
        } catch (error) {
            console.error(`Error fetching process list for ${selectedPlugin}:`, error);
        }

    };

    return (
        <div className="gap-3 flex-col p-3">
            <div className="gap-3">
                <p className="text-themeText-light text-sm">
                    Project Name: <span className="italic">{projectName}</span>
                </p>
                <p className="text-themeText-light text-sm">
                    Working Directory: <span className="italic">{folderPath}</span>
                </p>
            </div>
            <div className="flex flex-row gap-8 mt-3 mb-3 w-full">
                <div className="w-2/3 flex flex-row">
                    <select
                        className="rounded p-1 shadow"
                        value={selectedPlugin}
                        onChange={handlePluginChange}
                    >
                        <option value="" disabled selected>Select a plugin</option>
                        {pluginList.map((plugin, i) => (
                            <option key={i} value={plugin.name}>{plugin.name}</option>
                        ))}
                    </select>
                    <button onClick={fetchUpdatedProcessList} className="p-1 ms-3 w-32 bg-themeYellow-default shadow rounded">
                        Run
                    </button>
                </div>
                <div className="w-1/3 relative">
                    <img src="../public/img/search-icon.png" className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" alt="search icon"/>
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