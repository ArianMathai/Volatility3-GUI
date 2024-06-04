import { useAppContext } from "../../context/Context";
import { useState } from "react";

const AdditionalPluginBar = () => {
    const { projectName, folderPath, osName, file, plugins, setProcessList, processList, setPlugins,pluginList } = useAppContext();
    //const [selectedAdditionalPlugin, setSelectedAdditionalPlugin] = useState("");
    const [selectedPlugin, setSelectedPlugin] = useState()

    const handlePluginChange = (e) => {
        if(e.target.value === "") return;
        setSelectedPlugin(e.target.value);
        console.log("Handle plugin change: ", selectedPlugin);
    };

    const fetchUpdatedProcessList = async () => {
        if (!selectedPlugin) return;

        setPlugins((prevList) => [...prevList,selectedPlugin]);
        console.log("Pugins:", plugins);
        console.log("Selected plugin:", selectedPlugin);

        const processList = [];

        try {
            const res = await window.electronAPI.fetchProcessList(file.path,osName.os,selectedPlugin);
            processList.push({ selectedPlugin, processes: res.processes });
            console.log("Updated processList: ", processList);

        } catch (error) {
            console.error(`Error fetching process list for ${selectedPlugin}:`, error);
        }

        setProcessList((prev) => [...prev, processList]);

    };

    return (
        <div className="w-1/2 flex justify-between p-4">
            <div className="p-1 ps-3 pe-3 max-w-[150px] italic truncate rounded shadow bg-themeGray-default">
                <p>{projectName}</p>
            </div>
            <div className="p-1 ps-3 pe-3 max-w-[150px] italic truncate rounded shadow bg-themeGray-default">
                <p>{folderPath}</p>
            </div>
            <select
                className="rounded shadow"
                value={selectedPlugin}
                onChange={handlePluginChange}
            >
                <option value="Select a plugin"></option>
                {pluginList.map((plugin, i) => (
                    <option key={i} value={plugin.name}>{plugin.name}</option>
                ))}
            </select>
            <button onClick={fetchUpdatedProcessList} className="p-1 ps-3 pe-3 bg-themeYellow-default shadow rounded">
                Run
            </button>
        </div>
    );
}

export default AdditionalPluginBar;